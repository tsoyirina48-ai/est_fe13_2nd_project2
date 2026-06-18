const siteHeader = document.querySelector(".site__header");
function renderHeader() {
  siteHeader.innerHTML = /* HTML */ `
    <div class="wrapper">
      <a href="#content" class="skip-link visually-hidden">컨텐츠로 바로가기</a>
      <nav class="site__nav" aria-labelledby="site-nav-label">
        <ul class="site__nav__main">
          <li>
            <button
              class="site__nav__toggle"
              aria-expanded="false">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
              <span class="visually-hidden">메뉴 열기</span>
            </button>
          </li>
          <li>
            <a href="/est_fe13_2nd_project/" class="site__nav__logo text-headline-small" id="site-nav-label">ROUNZ</a>
          </li>
        </ul>
        <label for="theme" class="visually-hidden">화면 테마 변경</label>
        <select id="theme">
          <option value="system" aria-label="시스템 설정 모드" selected>⚙</option>
          <option value="light" aria-label="라이트 모드">☀</option>
          <option value="dark" aria-label="다크 모드">☾</option>
        </select>
        <ul class="site__nav__actions" role="list">
          <li>
            <a href="/est_fe13_2nd_project/login.html">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
              <span class="visually-hidden">프로필</span>
            </a>
          </li>
          <li>
            <a href="/est_fe13_2nd_project/cart.html" class="pile">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              <span class="visually-hidden">장바구니</span>
              <span class="cart__counter badge">1</span>
            </a>
          </li>
        </ul>
        <div class="site__nav__content" inert>
          <button class="site__nav__close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            <span class="visually-hidden">메뉴 닫기</span>
          </button>
          <ul role="list">
            <li><a href="/est_fe13_2nd_project/productList.html?action=showSunglasses">선글라스</a></li>
            <li><a href="/est_fe13_2nd_project/productList.html?action=showLens">렌즈</a></li>
            <li><a href="/est_fe13_2nd_project/productList.html?action=showAccessory">액세서리</a></li>
            <li><a href="/est_fe13_2nd_project/productList.html?action=showEyewear">아이웨어</a></li>
				  </ul>
        </div>
      </nav>
    </div>
  `;
}
renderHeader();
initNav();
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

function restoreColorSchemePreference() {
  const colorScheme = localStorage.getItem(colorSchemeStorageItemName);

  if (!colorScheme) {
    // There is no stored preference to restore
    return;
  }

  const option = colorSchemeSelectorEl.querySelector(`[value=${colorScheme}]`);

  if (!option) {
    // The stored preference has no corresponding option in the UI.
    localStorage.removeItem(colorSchemeStorageItemName);
    return;
  }

  if (option.selected) {
    // The stored preference's corresponding menu option is already selected
    return;
  }

  option.selected = true;
}

/*
 * Store an event target's value in localStorage under colorSchemeStorageItemName
 */
function storeColorSchemePreference({ target }) {
  const colorScheme = target.querySelector(":checked").value;
  localStorage.setItem(colorSchemeStorageItemName, colorScheme);
}

// The name under which the user's color scheme preference will be stored.
const colorSchemeStorageItemName = "preferredColorScheme";

// The color scheme preference front-end UI.
const colorSchemeSelectorEl = document.querySelector("#theme");

if (colorSchemeSelectorEl) {
  restoreColorSchemePreference();

  // When the user changes their color scheme preference via the UI,
  // store the new preference.
  colorSchemeSelectorEl.addEventListener("input", storeColorSchemePreference);
}
