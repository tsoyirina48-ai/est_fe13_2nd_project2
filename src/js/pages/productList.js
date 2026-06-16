import "modern-normalize";
import "../../css/style.css";

import { renderHeader } from "../modules/header.js";
import "../../js/modules/footer.js";
import "../../css/pages/productList.css";

const productGrid = document.querySelector(".grid");

const countPerPage = 4;
const currentPage = 1;
let products = [];
let filteredData = [];

renderHeader();

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

function renderProducts(data) {
  const pagedData = paginate(data, currentPage);

  const productHTML = pagedData.map(
    p =>
      `<article class="product-card">
          <div class="product-card__image-container">
            <img
              class="product-card__image"
              src="/images/1.webp"
              alt="RAY-BAN Classic Aviator"
              loading="lazy"
            >
            <span class="product-card__badge">BEST</span>
          </div>
          <div class="product-card__content">
            <p class="product-card__brand">RAY-BAN</p>
            <h3 class="product-card__title">Classic Aviator</h3>
            <div class="product-card__tags">
              <span class="product-card__tag">Aviator</span>
              <span class="product-card__tag">Black</span>
            </div>
            <div class="product-card__rating" aria-label="별점 5점 만점에 4점">
              <svg
                class="product-card__star product-card__star--filled"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
              <svg
                class="product-card__star product-card__star--filled"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
              <svg
                class="product-card__star product-card__star--filled"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
              <svg
                class="product-card__star product-card__star--filled"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
              <svg
                class="product-card__star product-card__star--empty"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
            </div>
            <p class="product-card__price">₩320,000</p>
          </div>
        </article>`,
  );

  productGrid.innerHTML = productHTML.join("");
  // filteredCount.innerHTML = `총 ${data.length}개 상품`; //총 248개 상품
}

function paginate(data, page) {
  const start = (page - 1) * countPerPage;
  const end = start + countPerPage;
  return data.slice(start, end);
}
