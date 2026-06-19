import{n as e,t}from"./footer-D0eCpzNq.js";import{n}from"./products-DBYxXyyF.js";/* empty css                         */function r(){let e=new URLSearchParams(window.location.search).get(`action`);if(e===`showSunglasses`){let e=document.querySelector(`input[value="sunglasses"]`);e&&(e.checked=!0,e.dispatchEvent(new Event(`change`,{bubbles:!0})))}else if(e===`showLens`){let e=document.querySelector(`input[value="lens"]`);e&&(e.checked=!0,e.dispatchEvent(new Event(`change`,{bubbles:!0})))}else if(e===`showAccessory`){let e=document.querySelector(`input[value="accessory"]`);e&&(e.checked=!0,e.dispatchEvent(new Event(`change`,{bubbles:!0})))}else if(e===`showEyewear`){let e=document.querySelector(`input[value="eyewear"]`);e&&(e.checked=!0,e.dispatchEvent(new Event(`change`,{bubbles:!0})))}}var i=document.querySelector(`.grid`),a=document.querySelector(`.pagination`),o=document.querySelector(`.filter-button`),s=document.querySelector(`.filter-panel`),c=document.querySelector(`.filter-panel__close-button`),l=document.querySelector(`#category-filter`),u=document.querySelector(`#brand-filter`),d=document.querySelector(`#color-filter`),f=document.querySelector(`#Price-filter`),p=document.querySelector(`.search-input`),m=[],h=[],g=[],_=[],v=4,y=3,b=1,x=[],S=[],C=`<svg class="product-card__star product-card__star--filled" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,w=`<svg class="product-card__star product-card__star--half" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"/></svg>`,T=`<svg class="product-card__star product-card__star--empty" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;async function E(){try{x=n.products,S=x,R(),A(S.length),D(S),j(),M(),N(),P(),I(),r()}catch(e){console.error(`Failed to load products:`,e),confirm(`상품을 불러오는 데 실패했습니다. 다시 시도하시겠습니까?`)&&E()}}E();function D(e){i.innerHTML=O(e,b).map(e=>{let t=e.badge&&e.badge.toLowerCase()===`sale`&&e.sale_rate>0,n=t?Math.round(e.price*(1-e.sale_rate/100)):e.price,r=e.badge?`<span class="product-card__badge badge--${e.badge.toLowerCase()}">${t?`-${e.sale_rate}%`:e.badge}</span>`:``,i=t?`<p class="product-card__price">
           ₩${n.toLocaleString()}
           <span class="product-card__original-price">₩${e.price.toLocaleString()}</span>
         </p>`:`<p class="product-card__price">₩${n.toLocaleString()}</p>`;return`<article class="product-card">
          <div class="product-card__image-container">
            <a href="detail.html?id=${e.id}" class="product-card__image-link">
              <img
                class="product-card__image"
                src="${e.thumbnail}"
                alt="${e.title}"
                loading="lazy"
              >
            </a>
            ${r}
            <button type="button" class="product-card__cart-button" data-id="${e.id}" aria-label="장바구니 담기">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
            </button>
          </div>
          <div class="product-card__content">
            <p class="product-card__brand">${e.brand}</p>
            <h3 class="product-card__title">
              <a href="detail.html?id=${e.id}">${e.title}</a>
            </h3>
            <div class="product-card__tags">
              ${e.category?`<span class="product-card__tag">${e.category}</span>`:``}
              ${e.color?`<span class="product-card__tag">${e.color}</span>`:``}
            </div>
            <div class="product-card__rating" aria-label="별점 5점 만점에 ${e.rating}점">
              ${k(e.rating)}
            </div>
            ${i}
            <a href="detail.html?id=${e.id}" class="product-card__view-details">
              View Details &rsaquo;
            </a>
          </div>
        </article>`}).join(``)}function O(e,t){let n=(t-1)*v,r=n+v;return e.slice(n,r)}function k(e){let t=Math.floor(e),n=e%1!=0,r=5-t-!!n,i=``;for(let e=0;e<t;e++)i+=C;n&&(i+=w);for(let e=0;e<r;e++)i+=T;return i}function A(e){let t=Math.ceil(e/v);if(t<=1){a.innerHTML=``;return}let n=y,r=Math.floor((b-1)/n)*n+1,i=Math.min(r+n-1,t),o=``;o+=`<button type="button" class="pagination__btn pagination__prev" ${b===1?`disabled`:``}>PrevBtn</button>`;for(let e=r;e<=i;e++)o+=`<button type="button" class="pagination__btn pagination__page ${e===b?`active`:``}" data-page="${e}">${e}</button>`;o+=`<button type="button" class="pagination__btn pagination__next" ${b===t?`disabled`:``}>NextBtn</button>`,a.innerHTML=o,a.querySelectorAll(`.pagination__page`).forEach(e=>{e.addEventListener(`click`,e=>{b=Number(e.currentTarget.dataset.page),D(S),A(S.length)})});let s=a.querySelector(`.pagination__prev`);s&&b>1&&s.addEventListener(`click`,()=>{b--,D(S),A(S.length)});let c=a.querySelector(`.pagination__next`);c&&b<t&&c.addEventListener(`click`,()=>{b++,D(S),A(S.length)})}o&&s&&c&&(o.addEventListener(`click`,()=>{o.classList.add(`hidden`),s.classList.remove(`hidden`)}),c.addEventListener(`click`,()=>{s.classList.add(`hidden`),o.classList.remove(`hidden`)}));function j(){let e=[...new Set(x.map(e=>e.category))].filter(Boolean),t=document.createDocumentFragment();e.forEach(e=>{let n=document.createElement(`label`);n.className=`custom-checkbox`,n.innerHTML=`
      <input type="checkbox" name="category" value="${e}">
      <svg
        width="32"
        height="32"
        viewBox="-4 -4 39 39"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          class="checkbox__background"
          width="35"
          height="35"
          x="-2"
          y="-2"
          stroke="currentColor"
          fill="none"
          stroke-width="3"
          rx="6"
          ry="6"
        ></rect>
        <polyline
          class="checkbox__checkmark"
          points="4,14 12,23 28,5"
          stroke="transparent"
          stroke-width="4"
          fill="none"
        ></polyline>
      </svg>
      <span>${e}</span>
    `,t.appendChild(n)}),l.appendChild(t)}function M(){let e=[...new Set(x.map(e=>e.brand))].filter(Boolean),t=document.createDocumentFragment();e.forEach(e=>{let n=document.createElement(`label`);n.className=`custom-checkbox`,n.innerHTML=`
      <input type="checkbox" name="brand" value="${e}">
      <svg
        width="32"
        height="32"
        viewBox="-4 -4 39 39"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          class="checkbox__background"
          width="35"
          height="35"
          x="-2"
          y="-2"
          stroke="currentColor"
          fill="none"
          stroke-width="3"
          rx="6"
          ry="6"
        ></rect>
        <polyline
          class="checkbox__checkmark"
          points="4,14 12,23 28,5"
          stroke="transparent"
          stroke-width="4"
          fill="none"
        ></polyline>
      </svg>
      <span>${e}</span>
    `,t.appendChild(n)}),u.appendChild(t)}function N(){let e=[...new Set(x.map(e=>e.color))].filter(Boolean),t=document.createDocumentFragment();e.forEach(e=>{let n=document.createElement(`label`);n.className=`custom-checkbox`,n.innerHTML=`
      <input type="checkbox" name="color" value="${e}">
      <svg
        width="32"
        height="32"
        viewBox="-4 -4 39 39"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          class="checkbox__background"
          width="35"
          height="35"
          x="-2"
          y="-2"
          stroke="currentColor"
          fill="none"
          stroke-width="3"
          rx="6"
          ry="6"
        ></rect>
        <polyline
          class="checkbox__checkmark"
          points="4,14 12,23 28,5"
          stroke="transparent"
          stroke-width="4"
          fill="none"
        ></polyline>
      </svg>
      <span>${e}</span>
    `,t.appendChild(n)}),d.appendChild(t)}function P(){let e=[{value:`low`,label:`₩200,000 이하`},{value:`middle`,label:`₩200,000 ~ ₩400,000`},{value:`high`,label:`₩400,000 이상`}],t=document.createDocumentFragment();e.forEach(e=>{let n=document.createElement(`label`);n.className=`custom-checkbox`,n.innerHTML=`
      <input type="checkbox" name="price" value="${e.value}">
      <svg
        width="32"
        height="32"
        viewBox="-4 -4 39 39"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          class="checkbox__background"
          width="35"
          height="35"
          x="-2"
          y="-2"
          stroke="currentColor"
          fill="none"
          stroke-width="3"
          rx="6"
          ry="6"
        ></rect>
        <polyline
          class="checkbox__checkmark"
          points="4,14 12,23 28,5"
          stroke="transparent"
          stroke-width="4"
          fill="none"
        ></polyline>
      </svg>
      <span>${e.label}</span>
    `,t.appendChild(n)}),f.appendChild(t)}function F(e,t,n=`all`){if(!e)return;let r=e.querySelector(`input[value="${n}"]`),i=e.querySelectorAll(`input:not([value="${n}"])`);r&&r.addEventListener(`change`,()=>{r.checked?(i.forEach(e=>{e.checked=!1}),t([]),L()):[...i].some(e=>e.checked)||(r.checked=!0)}),i.forEach(e=>{e.addEventListener(`change`,()=>{e.checked?r&&(r.checked=!1):![...i].some(e=>e.checked)&&r&&(r.checked=!0),t([...i].filter(e=>e.checked).map(e=>e.value)),L()})})}function I(){F(l,e=>{m=e}),F(u,e=>{h=e}),F(d,e=>{g=e}),F(f,e=>{_=e}),p&&p.addEventListener(`input`,()=>{L()})}function L(){let e=[...x];m.length>0&&(e=e.filter(e=>m.includes(e.category))),h.length>0&&(e=e.filter(e=>h.includes(e.brand))),g.length>0&&(e=e.filter(e=>g.includes(e.color))),_.length>0&&(e=e.filter(e=>_.some(t=>t===`low`?e.price<=2e5:t===`middle`?e.price>2e5&&e.price<=4e5:t===`high`?e.price>4e5:!1)));let t=p?p.value.trim().toLowerCase():``;t&&(e=e.filter(e=>e.title.toLowerCase().includes(t)||e.brand.toLowerCase().includes(t))),b=1,S=e,D(e),A(e.length)}function R(){let e=window.innerWidth;v=e>=1200?8:e>=768?6:4}var z;window.addEventListener(`resize`,()=>{clearTimeout(z),z=setTimeout(()=>{let e=v;R(),e!==v&&(b=1,L())},150)}),i.addEventListener(`click`,e=>{let n=e.target.closest(`button`);if(!n)return;let r=Number(n.dataset.id);t(x.find(e=>e.id===r))}),e();