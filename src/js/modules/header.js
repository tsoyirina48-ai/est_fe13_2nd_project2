import { createIcons, Menu, ShoppingCart, UserRound } from "lucide";
import "../../css/modules/header.css";

const siteHeader = document.querySelector(".site__header");
export function renderHeader() {
  siteHeader.innerHTML = /* HTML */ `
    <div class="wrapper">
      <nav class="site__nav" aria-labelledby="site-nav-label">
        <ul class="site__nav__main">
          <li>
            <button
              class="site__nav__toggle"
              aria-expanded="false"
              aria-label="메뉴 열기">
              <i data-lucide="menu" aria-hidden="true"></i>
            </button>
          </li>
          <li>
            <a href="/est_fe13_2nd_project/" class="site__nav__logo text-headline-small" id="site-nav-label">ROUNZ</a>
          </li>
        </ul>
        <label for="theme" class="visually-hidden">테마 선택기</label>
        <select id="theme">
          <option value="system" selected>시스템 모드</option>
          <option value="light">라이트 모드</option>
          <option value="dark">다크 모드</option>
        </select>
        <ul class="site__nav__actions" role="list">
          <li>
            <a href="#" aria-label="프로필"><i data-lucide="user-round" aria-hidden="true"></i></a>
          </li>
          <li>
            <a href="#" class="pile" aria-label="장바구니">
              <i data-lucide="shopping-cart" aria-hidden="true"></i>
              <span class="cart__counter badge">1</span>
            </a>
          </li>
        </ul>
        <div class="site__nav__content" inert>
          <button class="site__nav__close" aria-label="메뉴 닫기">닫기</button>
        </div>
      </nav>
    </div>
  `;
  createIcons({ icons: { Menu, UserRound, ShoppingCart } });
  initNav();
}

function initNav() {
  const nav = document.querySelector(".site__nav");
  // nav.classList.add("enhanced");
  const navButton = document.querySelector(".site__nav__toggle");
  const navCloseBtn = document.querySelector(".site__nav__close");
  const navContent = document.querySelector(".site__nav__content");
  // const isDesktop = window.matchMedia("(min-width: 52em)");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const siblings = document.querySelectorAll(".wrapper > *:not(nav)");

  navCloseBtn.addEventListener(
    "click",
    () => {
      hideNav();
      navButton.focus();
    },
    false,
  );

  document.addEventListener(
    "keydown",
    e => {
      if (
        navButton.getAttribute("aria-expanded") === "true" &&
        e.key === "Escape"
      ) {
        hideNav();
        navButton.focus();
      }
    },
    false,
  );

  navButton.addEventListener("click", showNavigationContent, false);

  function hideNav() {
    nav.classList.add("closed");
    navButton.setAttribute("aria-expanded", "false");
    // dropdowns.forEach(function (dropdown) {
    // 	dropdown.setAttribute("hidden", "");
    // 	let btn = dropdown.parentNode.querySelector("button");
    // 	btn.setAttribute("aria-expanded", "false");
    // });
    makeNavInert();
    removePageInert();
  }

  function makePageInert() {
    if (main) {
      main.setAttribute("inert", "");
    }
    if (footer) {
      footer.setAttribute("inert", "");
    }

    for (let i = 0; i < siblings.length; i++) {
      siblings[i].setAttribute("inert", "true");
    }
  }

  function removePageInert() {
    if (main) {
      main.removeAttribute("inert");
    }
    if (footer) {
      footer.removeAttribute("inert");
    }

    for (let i = 0; i < siblings.length; i++) {
      siblings[i].removeAttribute("inert");
    }
  }

  function makeNavInert() {
    navContent.setAttribute("inert", "");
  }

  function removeNavInert() {
    navContent.removeAttribute("inert");
  }

  function showNavigationContent() {
    navButton.setAttribute("aria-expanded", "true");
    removeNavInert();
    makePageInert();
    navCloseBtn.focus();
  }
}
