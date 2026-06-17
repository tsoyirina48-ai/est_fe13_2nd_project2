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

const tabs = document.querySelectorAll(".tabs a");
const detailContents = document.querySelectorAll(".detail-content");

// 상품 정보 탭 구현
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
});
// 썸네일 이미지 클릭시 해당 슬라이드로 이동
const thumbnails = document.querySelectorAll(".product-thumbnails img");

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    swiper.slideTo(index);
  });
});
