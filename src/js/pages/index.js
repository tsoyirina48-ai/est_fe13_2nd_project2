import "modern-normalize";
import "../../css/style.css";

import "../modules/header.js";

import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../css/pages/index.css";
import { renderTabs } from "../modules/tabs.js";

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination, Autoplay],
  // Optional parameters
  loop: false,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

renderTabs();

const noticeItemTemplate = document.querySelector("#main-notice-template");
const eventItemTemplate = document.querySelector("#main-event-template");
const faqItemTemplate = document.querySelector("#main-faq-template");

import { events } from "../../../data/event.json";
import { faqs } from "../../../data/faq.json";
import { notices } from "../../../data/notice.json";

function renderTabContent() {
  const noticeItemContainer = document.querySelector("#notice");
  const eventItemContainer = document.querySelector("#event");
  const faqItemContainer = document.querySelector("#faq");

  const skeletonItem = noticeItemContainer.querySelectorAll(".skeleton");
  // skeletonGrid.innerHTML = "";

  notices.forEach((notice, i) => {
    const noticeItem = noticeItemTemplate.content.cloneNode(true);

    noticeItem.querySelector(".tab__panel--notice__title").textContent =
      notice.title;
    noticeItem.querySelector(".tab__panel--notice__date").textContent =
      notice.date;

    skeletonItem[i].replaceWith(noticeItem);
  });

  events.forEach(event => {
    const eventItem = eventItemTemplate.content.cloneNode(true);
    eventItem.querySelector(".tab__panel--event__title").textContent =
      event.title;

    eventItem.querySelector(".tab__panel--event__description").textContent =
      event.description;

    eventItemContainer.appendChild(eventItem);
  });

  faqs.forEach(faq => {
    const faqItem = faqItemTemplate.content.cloneNode(true);
    faqItem.querySelector(".tab__panel--faq__question").textContent =
      faq.question;

    faqItem.querySelector(".tab__panel--faq__answer").textContent = faq.answer;

    faqItemContainer.appendChild(faqItem);
  });
}

import { products } from "../../../data/products.json";

renderTabContent();

function renderFetured() {
  const featuredItemTemplate = document.querySelector(
    "#main-featured-template",
  );
  const featuredContainer = document.querySelector(".main__featured-container");

  const featuredProducts = products.slice(0, 6);

  const skeletonCards = featuredContainer.querySelectorAll(".skeleton-card");

  featuredProducts.forEach((featuredProduct, index) => {
    const featuredItem = featuredItemTemplate.content.cloneNode(true);
    featuredItem.querySelector(".main__featured-image").src =
      featuredProduct.thumbnailMin;
    featuredItem.querySelector(".main__featured-image").alt =
      featuredProduct.title;
    featuredItem.querySelector(".main__featured-brand").textContent =
      featuredProduct.brand;
    featuredItem.querySelector(".main__featured-title").textContent =
      featuredProduct.title;
    featuredItem.querySelector(".main__featured-price").textContent =
      `₩${featuredProduct.price}`;

    skeletonCards[index].replaceWith(featuredItem);
  });
}
renderFetured();

import "../../js/modules/footer.js";
