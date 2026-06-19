(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){try{return JSON.parse(window.localStorage.getItem(`cart`))||[]}catch(e){return console.error(`장바구니 데이터를 읽는 중 오류 발생`,e),[]}}function t(e){window.localStorage.setItem(`cart`,JSON.stringify(e))}function n(){return e().reduce((e,t)=>e+t.qty,0)}function r(){let e=document.querySelector(`.cart__counter`);e&&(e.textContent=n())}function i(n,i=1){if(console.log(i),!n)return;let a=e(),o=a.find(e=>e.id===n.id);o?o.qty+=i:a.push({id:n.id,title:n.title,price:n.price,brand:n.brand,thumb:n.thumbnail,qty:i}),t(a),r()}var a=document.querySelector(`.site__header`);function o(){a.innerHTML=`
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
  `}o();function s(){let e=document.querySelector(`.site__nav`),t=document.querySelector(`.site__nav__toggle`),n=document.querySelector(`.site__nav__close`),r=document.querySelector(`.site__nav__content`),i=document.querySelector(`main`),a=document.querySelector(`footer`),o=document.querySelectorAll(`.wrapper > *:not(nav)`),s=document.querySelectorAll(`.site__nav > *:not(.site__nav__content)`);n.addEventListener(`click`,()=>{c(),t.focus()},!1),document.addEventListener(`keydown`,e=>{t.getAttribute(`aria-expanded`)===`true`&&e.key===`Escape`&&(c(),t.focus())},!1),t.addEventListener(`click`,p,!1);function c(){e.classList.add(`closed`),t.setAttribute(`aria-expanded`,`false`),d(),u()}function l(){i&&i.setAttribute(`inert`,``),a&&a.setAttribute(`inert`,``);for(let e=0;e<o.length;e++)o[e].setAttribute(`inert`,``);for(let e=0;e<s.length;e++)s[e].setAttribute(`inert`,``)}function u(){i&&i.removeAttribute(`inert`),a&&a.removeAttribute(`inert`);for(let e=0;e<o.length;e++)o[e].removeAttribute(`inert`);for(let e=0;e<s.length;e++)s[e].removeAttribute(`inert`)}function d(){r.setAttribute(`inert`,``)}function f(){r.removeAttribute(`inert`)}function p(){t.setAttribute(`aria-expanded`,`true`),f(),l(),n.focus()}}s();function c(){let e=localStorage.getItem(u);if(!e)return;let t=d.querySelector(`[value=${e}]`);if(!t){localStorage.removeItem(u);return}t.selected||=!0}function l({target:e}){let t=e.querySelector(`:checked`).value;localStorage.setItem(u,t)}var u=`preferredColorScheme`,d=document.querySelector(`#theme`);d&&(c(),d.addEventListener(`input`,l)),r();function f(){let e=document.querySelector(`.site__footer`);e.innerHTML=`
      <div class="wrapper">
        <h2 class="site__footer__heading text-title-medium">ROUNZ</h3>
        <div class="text-body-medium">
          <a href="#">회사소개</a> | <a href="#">이용약관</a
          > | <a href="#">개인정보처리방침</a>
        </div>
        <div class="site__footer__customor-service text-body-medium">
          <p>고객센터: 1588-0000</p>
          <p>운영시간: 평일 09:00~18:00 (점심 12:00~13:00)</p>
        </div>
        <small class="text-body-medium">&copy; 2026 ROUNZ Inc. All rights reserved.</small>
      </div>
  `}f();export{r as n,i as t};