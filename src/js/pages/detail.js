import "modern-normalize";
import "../../css/style.css";

import "../modules/header.js";
import "../modules/footer.js";

import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../css/pages/detail.css";

import { addToCart } from "../utils/common.js";

let product = {};

//URLSearchParams mdn
//url 생성자에 전달된 주소를 url.search를 통해 params라는 변수로 검색
export async function fetchProduct() {
  //console.log(location.href); //http://127.0.0.1:5500/detail.html?id=3
  //console.log(location.search); //?id=3
  const params = new URLSearchParams(location.search);
  //console.log(params.get("id")); // 3
  const productID = params.get("id"); //3
  if (!productID) {
    alert("잘못된 접근입니다. 홈으로 이동하겠습니다.");
    location.href = "./index.html";
  }
  try {
    const res = await fetch("/data/products.json");
    if (!res.ok) throw new Error("로딩에 실패했습니다.");
    const data = await res.json();
    console.log(data);
    //조회된 상품정보에서 상품의 id가 productID와 일치하는 요소를 변수 product 할당
    product = data.products.find(p => p.id === Number(productID));
    createContent(product);
    createRecommendLists(data.products, product.category);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("조회를 종료했습니다.");
  }
}

function createContent(data) {
  const title = document.querySelector("#product-title"),
    category = document.querySelectorAll(".product-category"),
    origin_price = document.querySelector(".product-price"),
    discount_badge = document.querySelector(".discount-badge"),
    mainImage = document.querySelector(".main-image img"),
    thumbnailImages = document.querySelectorAll(".product-thumbnails img"),
    brand = document.querySelectorAll(".product-brand"),
    rating = document.querySelectorAll(".rating-score"),
    color = document.querySelector(".product-color");

  title.textContent = data.title;
  category.textContent = data.category;
  desc.textContent = data.description;
  origin_price.textContent = (
    data.price /
    (1 - data.discountPercentage / 100)
  ).toFixed(2);
  sale_price.textContent = data.price;
  discount_rate.textContent = data.discountPercentage;
  mainImage.setAttribute("src", data.images[0]);
}

// 상품 정보 탭 구현
const tabs = document.querySelectorAll(".tabs a");
const detailContents = document.querySelectorAll(".detail-content");
tabs.forEach(t => {
  t.addEventListener("click", e => {
    e.preventDefault();

    // 기존 active 제거
    tabs.forEach(tab => {
      tab.classList.remove("active");
    });
    detailContents.forEach(dc => {
      dc.classList.remove("active");
    });

    // 클릭한 탭 active 추가
    t.classList.add("active");

    // href 값을 가져온 후 active 추가
    const id = e.target.getAttribute("href");
    document.querySelector(id).classList.add("active");
  });
});

// 이미지 슬라이드 구현
const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination, Autoplay],
  loop: true,

  // 페이지네이션
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },

  // 오토 슬라이드
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
  },
});
// 썸네일 이미지 클릭시 해당 슬라이드로 이동
const thumbnails = document.querySelectorAll(".product-thumbnails img");

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    swiper.slideTo(index);
  });
});

// 좋아요 버튼
const favorite = document.querySelector(".product-brand-like a span");
favorite.addEventListener("click", e => {
  e.preventDefault();
  favorite.classList.toggle("active");
  if (favorite.classList.contains("active")) {
    favorite.textContent = "favorite";
  } else {
    favorite.textContent = "favorite_border";
  }
});

// 상품 수량 변경하기
const quantity_control = document.querySelector(".quantity-control");
const quantity = document.querySelector("#quantity");
/*
quantity_control 클릭했을 때, 클릭한 그 요소의 가까운 부모가 button이라면
  변수 currentQty id quantity의 내용을 할당
  그 버튼의 내용이 - 와 같다면
    currentQty를 1 차감
  아니라면
    currentQty를 1 증가
*/
quantity_control.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  let currentQty = Number(quantity.value);
  if (btn.textContent === "-") {
    if (currentQty > 1) {
      currentQty--;
    }
  } else {
    currentQty++;
  }
  quantity.value = currentQty;
});

// 장바구니 추가 버튼
// 현재 수량을 addToCart 함수에 인수를 넣어 실행
const addcart = document.querySelector(".add-cart");
addcart.addEventListener("click", e => {
  e.preventDefault();
  addToCart(product, Number(quantity.value));
});
// 즉시구매 버튼
// 현재 수량을 addToCart 함수에 인수를 넣어 실행 및 cart.html로 이동
const buyNow = document.querySelector(".buy-now");
buyNow.addEventListener("click", e => {
  e.preventDefault();

  // 현재 상품과 수량을 장바구니에 추가
  addToCart(product, Number(quantity.value));

  // 장바구니 페이지로 이동
  location.href = "./cart.html";
});
const share = document.querySelector(".share");
share.addEventListener("click", e => {
  e.preventDefault();
});
