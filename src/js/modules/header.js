import { createIcons, Menu, UserRound, ShoppingCart } from "lucide";
import "../../css/modules/header.css";

const siteHeader = document.querySelector(".site__header");
export function renderHeader() {
  siteHeader.innerHTML = /* HTML */ `
    <div class="wrapper">
      <nav class="site__nav" aria-labelledby="site-nav-label">
        <button
          class="site__nav__toggle"
          aria-expanded="false"
          aria-label="메뉴 열기">
          <i data-lucide="menu"></i>
        </button>
        <a href="/" class="site__nav__logo" id="site-nav-label">ROUNZ</a>
        <ul class="site__nav__actions" role="list">
          <li>
            <a href="#"><i data-lucide="user-round"></i></a>
          </li>
          <li>
            <a href="#"><i data-lucide="shopping-cart"></i></a>
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
  const siblings = document.querySelectorAll(".wrapper > *:not(nav)");

  navCloseBtn.addEventListener(
    "click",
    function () {
      hideNav();
      navButton.focus();
    },
    false
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
    // if (footer) {
    //   footer.setAttribute("inert", "");
    // }

    for (let i = 0; i < siblings.length; i++) {
      siblings[i].setAttribute("inert", "true");
    }
  }

  function removePageInert() {
    if (main) {
      main.removeAttribute("inert");
    }
    // if (footer) {
    // 	footer.removeAttribute("inert");
    // }

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
