import "modern-normalize";
import "../../css/style.css";

import "../modules/header.js";
import "../../js/modules/footer.js";
import "../../css/pages/productList.css";

const productGrid = document.querySelector(".grid");

const countPerPage = 4;
const currentPage = 1;
let products = [];
let filteredData = [];

// 별 아이콘
const STAR_FILLED = `<svg class="product-card__star product-card__star--filled" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

const STAR_HALF = `<svg class="product-card__star product-card__star--half" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"/></svg>`;

const STAR_EMPTY = `<svg class="product-card__star product-card__star--empty" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

async function fetchProducts() {
  try {
    const res = await fetch("./data/products.json");
    const data = await res.json();
    products = data.products;
    filteredData = products;
    console.log(filteredData);
    //pagination 생성
    // makePagination(filteredData.length);

    renderProducts(filteredData);
    // renderCategories();
    // renderBrands();
    // renderPrices();
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
            <img
              class="product-card__image"
              src="${p.thumbnail}"
              alt="${p.title}"
              loading="lazy"
            >
            ${badgeHTML}
            <button type="button" class="product-card__cart-button" aria-label="장바구니 담기">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
            </button>
          </div>
          <div class="product-card__content">
            <p class="product-card__brand">${p.brand}</p>
            <h3 class="product-card__title">${p.title}</h3>
            <div class="product-card__tags">
              ${p.category ? `<span class="product-card__tag">${p.category}</span>` : ""}
              ${p.color ? `<span class="product-card__tag">${p.color}</span>` : ""}
            </div>
            <div class="product-card__rating" aria-label="별점 5점 만점에 ${p.rating}점">
              ${generateStarRating(p.rating)}
            </div>
            ${priceHTML}
            <div class="product-card__view-details">
              View Details &rsaquo;
            </div>
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
