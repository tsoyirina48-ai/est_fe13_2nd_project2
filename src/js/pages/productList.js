import "modern-normalize";
import "../../css/style.css";

import "../modules/header.js";
import "../../js/modules/footer.js";
import "../../css/pages/productList.css";
import { addToCart, updateCartCount } from "../utils/common.js";

const productGrid = document.querySelector(".grid");
const paginationContainer = document.querySelector(".pagination");
const filterBtn = document.querySelector(".filter-button");
const filterPanel = document.querySelector(".filter-panel");
const filterCloseBtn = document.querySelector(".filter-panel__close-button");
const categoryFilter = document.querySelector("#category-filter");
const brandFilter = document.querySelector("#brand-filter");
const colorFilter = document.querySelector("#color-filter");
const priceFilter = document.querySelector("#Price-filter");
const searchInput = document.querySelector(".search-input");

let selectedCategories = [];
let selectedBrands = [];
let selectedColors = [];
let selectedPrices = [];

let countPerPage = 4;
const pagerPerGroup = 3;
let currentPage = 1;
let products = [];
let filteredData = [];

// 별 아이콘
const STAR_FILLED = `<svg class="product-card__star product-card__star--filled" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const STAR_HALF = `<svg class="product-card__star product-card__star--half" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"/></svg>`;
const STAR_EMPTY = `<svg class="product-card__star product-card__star--empty" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

async function fetchProducts() {
  try {
    const res = await fetch("/est_fe13_2nd_project/data/products.json");
    const data = await res.json();
    products = data.products;
    filteredData = products;
    console.log(filteredData);
    updateCountPerPage();
    renderPagination(filteredData.length);

    renderProducts(filteredData);
    renderCategories();
    renderBrands();
    renderColors();
    renderPrices();
    initFilterEvents();
    applyUrlFilter();
  } catch {
  } finally {
  }
}
fetchProducts();

// grid안에 상품 카드 생성
function renderProducts(data) {
  const pagedData = paginate(data, currentPage);

  const productHTML = pagedData.map(p => {
    const isSale =
      p.badge && p.badge.toLowerCase() === "sale" && p.sale_rate > 0;
    const displayPrice = isSale
      ? Math.round(p.price * (1 - p.sale_rate / 100))
      : p.price;

    const badgeHTML = p.badge
      ? `<span class="product-card__badge badge--${p.badge.toLowerCase()}">${isSale ? `-${p.sale_rate}%` : p.badge}</span>`
      : "";

    const priceHTML = isSale
      ? `<p class="product-card__price">
           ₩${displayPrice.toLocaleString()}
           <span class="product-card__original-price">₩${p.price.toLocaleString()}</span>
         </p>`
      : `<p class="product-card__price">₩${displayPrice.toLocaleString()}</p>`;

    return `<article class="product-card">
          <div class="product-card__image-container">
            <a href="detail.html?id=${p.id}" class="product-card__image-link">
              <img
                class="product-card__image"
                src="${p.thumbnail}"
                alt="${p.title}"
                loading="lazy"
              >
            </a>
            ${badgeHTML}
            <button type="button" class="product-card__cart-button" data-id="${p.id}" aria-label="장바구니 담기">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
            </button>
          </div>
          <div class="product-card__content">
            <p class="product-card__brand">${p.brand}</p>
            <h3 class="product-card__title">
              <a href="detail.html?id=${p.id}">${p.title}</a>
            </h3>
            <div class="product-card__tags">
              ${p.category ? `<span class="product-card__tag">${p.category}</span>` : ""}
              ${p.color ? `<span class="product-card__tag">${p.color}</span>` : ""}
            </div>
            <div class="product-card__rating" aria-label="별점 5점 만점에 ${p.rating}점">
              ${generateStarRating(p.rating)}
            </div>
            ${priceHTML}
            <a href="detail.html?id=${p.id}" class="product-card__view-details">
              View Details &rsaquo;
            </a>
          </div>
        </article>`;
  });

  productGrid.innerHTML = productHTML.join("");
}

// 페이지 당 보여줄 항목 계수 설정
function paginate(data, page) {
  const start = (page - 1) * countPerPage;
  const end = start + countPerPage;
  return data.slice(start, end);
}

// 레이팅 기준 별점 생성
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsHTML = "";

  for (let i = 0; i < fullStars; i++) {
    starsHTML += STAR_FILLED;
  }

  if (hasHalfStar) {
    starsHTML += STAR_HALF;
  }

  for (let i = 0; i < emptyStars; i++) {
    starsHTML += STAR_EMPTY;
  }

  return starsHTML;
}

// 페이지 네이션 생성
function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / countPerPage);
  if (totalPages <= 1) {
    paginationContainer.innerHTML = "";
    return;
  }

  const maxPagesToShow = pagerPerGroup;
  const currentBlock = Math.floor((currentPage - 1) / maxPagesToShow);
  const startPage = currentBlock * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  let paginationHTML = "";

  paginationHTML += `<button type="button" class="pagination__btn pagination__prev" ${currentPage === 1 ? "disabled" : ""}>PrevBtn</button>`;

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `<button type="button" class="pagination__btn pagination__page ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
  }

  paginationHTML += `<button type="button" class="pagination__btn pagination__next" ${currentPage === totalPages ? "disabled" : ""}>NextBtn</button>`;

  paginationContainer.innerHTML = paginationHTML;

  paginationContainer.querySelectorAll(".pagination__page").forEach(btn => {
    btn.addEventListener("click", e => {
      currentPage = Number(e.currentTarget.dataset.page);
      renderProducts(filteredData);
      renderPagination(filteredData.length);
    });
  });

  const prevBtn = paginationContainer.querySelector(".pagination__prev");
  if (prevBtn && currentPage > 1) {
    prevBtn.addEventListener("click", () => {
      currentPage--;
      renderProducts(filteredData);
      renderPagination(filteredData.length);
    });
  }

  const nextBtn = paginationContainer.querySelector(".pagination__next");
  if (nextBtn && currentPage < totalPages) {
    nextBtn.addEventListener("click", () => {
      currentPage++;
      renderProducts(filteredData);
      renderPagination(filteredData.length);
    });
  }
}

// 필터 버튼 클릭시 이벤트 (480px )
if (filterBtn && filterPanel && filterCloseBtn) {
  filterBtn.addEventListener("click", () => {
    filterBtn.classList.add("hidden");
    filterPanel.classList.remove("hidden");
  });

  filterCloseBtn.addEventListener("click", () => {
    filterPanel.classList.add("hidden");
    filterBtn.classList.remove("hidden");
  });
}

//카테고리 생성
function renderCategories() {
  const categories = [...new Set(products.map(p => p.category))].filter(
    Boolean,
  );
  const frag = document.createDocumentFragment();
  categories.forEach(c => {
    const label = document.createElement("label");
    label.className = "custom-checkbox";
    label.innerHTML = `
      <input type="checkbox" name="category" value="${c}">
      <svg
        width="32"
        height="32"
        viewBox="-4 -4 39 39"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          class="checkbox__background"
          width="35"
          height="35"
          x="-2"
          y="-2"
          stroke="currentColor"
          fill="none"
          stroke-width="3"
          rx="6"
          ry="6"
        ></rect>
        <polyline
          class="checkbox__checkmark"
          points="4,14 12,23 28,5"
          stroke="transparent"
          stroke-width="4"
          fill="none"
        ></polyline>
      </svg>
      <span>${c}</span>
    `;
    frag.appendChild(label);
  });
  categoryFilter.appendChild(frag);
}

//브랜드 생성
function renderBrands() {
  const brands = [...new Set(products.map(p => p.brand))].filter(Boolean);
  const frag = document.createDocumentFragment();
  brands.forEach(b => {
    const label = document.createElement("label");
    label.className = "custom-checkbox";
    label.innerHTML = `
      <input type="checkbox" name="brand" value="${b}">
      <svg
        width="32"
        height="32"
        viewBox="-4 -4 39 39"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          class="checkbox__background"
          width="35"
          height="35"
          x="-2"
          y="-2"
          stroke="currentColor"
          fill="none"
          stroke-width="3"
          rx="6"
          ry="6"
        ></rect>
        <polyline
          class="checkbox__checkmark"
          points="4,14 12,23 28,5"
          stroke="transparent"
          stroke-width="4"
          fill="none"
        ></polyline>
      </svg>
      <span>${b}</span>
    `;
    frag.appendChild(label);
  });
  brandFilter.appendChild(frag);
}

//색상 생성
function renderColors() {
  const colors = [...new Set(products.map(p => p.color))].filter(Boolean);
  const frag = document.createDocumentFragment();
  colors.forEach(col => {
    const label = document.createElement("label");
    label.className = "custom-checkbox";
    label.innerHTML = `
      <input type="checkbox" name="color" value="${col}">
      <svg
        width="32"
        height="32"
        viewBox="-4 -4 39 39"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          class="checkbox__background"
          width="35"
          height="35"
          x="-2"
          y="-2"
          stroke="currentColor"
          fill="none"
          stroke-width="3"
          rx="6"
          ry="6"
        ></rect>
        <polyline
          class="checkbox__checkmark"
          points="4,14 12,23 28,5"
          stroke="transparent"
          stroke-width="4"
          fill="none"
        ></polyline>
      </svg>
      <span>${col}</span>
    `;
    frag.appendChild(label);
  });
  colorFilter.appendChild(frag);
}

//가격대 생성
function renderPrices() {
  const priceRanges = [
    { value: "low", label: "₩200,000 이하" },
    { value: "middle", label: "₩200,000 ~ ₩400,000" },
    { value: "high", label: "₩400,000 이상" },
  ];

  const frag = document.createDocumentFragment();
  priceRanges.forEach(p => {
    const label = document.createElement("label");
    label.className = "custom-checkbox";
    label.innerHTML = `
      <input type="checkbox" name="price" value="${p.value}">
      <svg
        width="32"
        height="32"
        viewBox="-4 -4 39 39"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          class="checkbox__background"
          width="35"
          height="35"
          x="-2"
          y="-2"
          stroke="currentColor"
          fill="none"
          stroke-width="3"
          rx="6"
          ry="6"
        ></rect>
        <polyline
          class="checkbox__checkmark"
          points="4,14 12,23 28,5"
          stroke="transparent"
          stroke-width="4"
          fill="none"
        ></polyline>
      </svg>
      <span>${p.label}</span>
    `;
    frag.appendChild(label);
  });
  priceFilter.appendChild(frag);
}

function setupFilterGroup(container, stateVarSetter, allValue = "all") {
  if (!container) return;
  const allInput = container.querySelector(`input[value="${allValue}"]`);
  const itemInputs = container.querySelectorAll(
    `input:not([value="${allValue}"])`,
  );

  if (allInput) {
    allInput.addEventListener("change", () => {
      if (allInput.checked) {
        itemInputs.forEach(input => {
          input.checked = false;
        });
        stateVarSetter([]);
        applyFilter();
      } else {
        const anyChecked = [...itemInputs].some(input => input.checked);
        if (!anyChecked) {
          allInput.checked = true;
        }
      }
    });
  }

  itemInputs.forEach(input => {
    input.addEventListener("change", () => {
      if (input.checked) {
        if (allInput) allInput.checked = false;
      } else {
        const anyChecked = [...itemInputs].some(input => input.checked);
        if (!anyChecked && allInput) {
          allInput.checked = true;
        }
      }

      const selectedValues = [...itemInputs]
        .filter(input => input.checked)
        .map(input => input.value);

      stateVarSetter(selectedValues);
      applyFilter();
    });
  });
}

// 모든 필터 그룹 초기화
function initFilterEvents() {
  setupFilterGroup(categoryFilter, vals => {
    selectedCategories = vals;
  });
  setupFilterGroup(brandFilter, vals => {
    selectedBrands = vals;
  });
  setupFilterGroup(colorFilter, vals => {
    selectedColors = vals;
  });
  setupFilterGroup(priceFilter, vals => {
    selectedPrices = vals;
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      applyFilter();
    });
  }
}

// 필터 적용
function applyFilter() {
  let result = [...products];

  // 카테고리
  if (selectedCategories.length > 0) {
    result = result.filter(p => selectedCategories.includes(p.category));
  }

  // 브랜드
  if (selectedBrands.length > 0) {
    result = result.filter(p => selectedBrands.includes(p.brand));
  }

  // 색상
  if (selectedColors.length > 0) {
    result = result.filter(p => selectedColors.includes(p.color));
  }

  // 가격
  if (selectedPrices.length > 0) {
    result = result.filter(p => {
      return selectedPrices.some(range => {
        if (range === "low") return p.price <= 200000;
        if (range === "middle") return p.price > 200000 && p.price <= 400000;
        if (range === "high") return p.price > 400000;
        return false;
      });
    });
  }

  // 검색어
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
  if (searchTerm) {
    result = result.filter(p => {
      return (
        p.title.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm)
      );
    });
  }

  currentPage = 1;
  filteredData = result;

  renderProducts(result);
  renderPagination(result.length);
}

// 윈도우 너비별로 페이지당 상품 개수를 다르게 설정 (480px 미만/이상: 4개, 768px 이상: 6개, 1200px 이상: 8개)
function updateCountPerPage() {
  const width = window.innerWidth;
  if (width >= 1200) {
    countPerPage = 8;
  } else if (width >= 768) {
    countPerPage = 6;
  } else {
    countPerPage = 4;
  }
}

// 윈도우 크기 조절 시 페이지당 상품 개수를 동적으로 갱신하고 필터 재적용
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const prevCount = countPerPage;
    updateCountPerPage();
    if (prevCount !== countPerPage) {
      currentPage = 1;
      applyFilter();
    }
  }, 150);
});
//장바구니에 추가
productGrid.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const pid = Number(btn.dataset.id);
  const product = products.find(p => p.id === pid);
  addToCart(product);
});

updateCartCount();

import { applyUrlFilter } from "../modules/categoryLink.js";
