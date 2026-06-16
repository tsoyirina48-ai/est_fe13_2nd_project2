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
