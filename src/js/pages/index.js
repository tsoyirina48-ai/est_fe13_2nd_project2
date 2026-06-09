import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../css/pages/index.css";
import { products } from "../../../data/products.json";
import { renderTabs } from "../modules/tabs.js";

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination, Autoplay],
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
  },
});

renderTabs();
