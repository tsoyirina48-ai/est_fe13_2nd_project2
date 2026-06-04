import { createIcons, Menu, UserRound, ShoppingCart } from "lucide";
import "../../css/modules/header.css";

const siteHeader = document.querySelector(".site__header");
export function renderHeader() {
  siteHeader.innerHTML = /* HTML */ `
    <div class="wrapper">
      <nav class="site__nav" aria-labelledby="site-nav-label">
        <button class="site__nav__togle" aria-expanded="false">
          <i data-lucide="menu"></i>
        </button>
        <span id="site-nav-label">ROUNZ</span>
        <ul role="list">
          <li>
            <a href="#"><i data-lucide="user-round"></i></a>
          </li>
          <li>
            <a href="#"><i data-lucide="shopping-cart"></i></a>
          </li>
        </ul>
        <div class="site__nav__content">
          <button class="site__nav__close">닫기</button>
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
  const navButton = document.querySelector(".site__nav__togle");
  const navCloseBtn = document.querySelector(".site__nav__close");
  const navContent = document.querySelector(".site__nav__content");
  const isDesktop = window.matchMedia("(min-width: 52em)");
  const main = document.querySelector("main");
  const siblings = document.querySelectorAll(".wrapper > *:not(nav)");

  let navIsShown = false;

  navCloseBtn.addEventListener(
    "click",
    function () {
      hideNav();
      navButton.focus();
    },
    false
  );

  function hideNav() {
    nav.classList.add("closed");
    navButton.setAttribute("aria-expanded", "false");
    // dropdowns.forEach(function (dropdown) {
    // 	dropdown.setAttribute("hidden", "");
    // 	let btn = dropdown.parentNode.querySelector("button");
    // 	btn.setAttribute("aria-expanded", "false");
    // });
    navIsShown = false;
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

    for (var i = 0; i < siblings.length; i++) {
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

    for (var i = 0; i < siblings.length; i++) {
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
    navIsShown = true;
    removeNavInert();
    makePageInert();
    navCloseBtn.focus();
  }

  const handleResize = e => {
    if (e.matches) {
      // is "desktop"
      navContent.removeAttribute("hidden");
      navButton.setAttribute("hidden", "");
      navCloseBtn.setAttribute("hidden", "");

      navContent.removeAttribute("role");
      navContent.removeAttribute("aria-labelledby");

      navCloseBtn.setAttribute("hidden", "");
      removeNavInert();
      removePageInert();
    } else {
      navButton.removeAttribute("hidden");
      navCloseBtn.removeAttribute("hidden");
      navContent.setAttribute("role", "dialog");
      navContent.setAttribute("aria-labelledby", "site-nav-label");

      if (navIsShown) {
        makeNavInert();
      } else {
        removeNavInert();
      }

      navButton.addEventListener("click", showNavigationContent, false);
    }
  };

  isDesktop.addEventListener("change", e => handleResize(e));
  handleResize(isDesktop);
}
