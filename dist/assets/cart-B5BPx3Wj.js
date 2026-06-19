import{n as e}from"./footer-D0eCpzNq.js";e();var t=new Set,n=document.querySelector(`.cart__select-all-checkbox`),r=document.querySelector(`.cart__delete-btn`);function i(){return JSON.parse(localStorage.getItem(`cart`))??[]}function a(e){localStorage.setItem(`cart`,JSON.stringify(e))}function o(){let e=i(),r=document.querySelector(`.cart__list`);r.innerHTML=``,r.innerHTML=e.map(e=>`
            <li class="cart__item">
              <input
                type="checkbox"
                id="${e.id}"
                class="cart__checkbox-input"
                ${t.has(e.id)?`checked`:``}
              >

              <label for="${e.id}" class="cart__checkbox-label">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-square-check-icon lucide-square-check cart__checkbox-icon cart__checkbox-icon--checked"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="m9 12 2 2 4-4" />
                </svg>

                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-square-icon lucide-square cart__checkbox-icon cart__checkbox-icon--unchecked"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                </svg>
              </label>
              <img src="${e.thumb}" alt="" class="cart__product-image">
              <div class="cart__product-info">
                <p class="cart__product-brand">${e.brand}</p>

                <h3 class="cart__product-name">${e.title}</h3>

                <p class="cart__product-price">₩${u(e.price)}</p>
                <div class="cart__quantity-control">
                  <button
                    type="button"
                    data-id="${e.id}"
                    class="cart__quantity-btn cart__quantity-btn--decrease"
                  >
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-square-minus-icon lucide-square-minus"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M8 12h8" />
                    </svg>
                  </button>
                  <span class="cart__quantity"> ${e.qty} </span>
                  <button
                    type="button"
                    data-id="${e.id}"
                    class="cart__quantity-btn cart__quantity-btn--increase"
                  >
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-square-plus-icon lucide-square-plus"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
    `).join(``),e.length===0&&(n.disabled=!0,r.innerHTML=`
    <li class="cart__empty">
      <h2>장바구니가 비어있습니다.</h2>
      <a href="../est_fe13_2nd_project/productList">한번 둘러볼까요?</a>
    </li>
  `)}function s(t){let n=i(),r=n.find(e=>e.id===t);r.qty+=1,a(n),e(),o(),f()}function c(t){let n=i(),r=n.find(e=>e.id===t);r.qty>1&&--r.qty,a(n),e(),o(),f()}var l=document.querySelector(`.cart__list`);l.addEventListener(`click`,e=>{let t=e.target.closest(`.cart__quantity-btn--increase`),n=e.target.closest(`.cart__quantity-btn--decrease`);t&&s(Number(t.dataset.id)),n&&c(Number(n.dataset.id))}),l.addEventListener(`change`,e=>{let r=e.target;if(!r.matches(`.cart__checkbox-input`))return;let a=Number(r.id);r.checked?t.add(a):(t.delete(a),n.checked=!1),[...document.querySelectorAll(`.cart__checkbox-input:checked`)].map(e=>Number(e.id)).length===i().length&&(n.checked=!0),f()}),o(),p(),f();function u(e){return new Intl.NumberFormat(`ko-KR`).format(e)}function d(){let e=i().filter(e=>t.has(e.id)).reduce((e,t)=>e+t.price*t.qty,0);return{productTotal:e,shippingFee:0,finalTotal:e+0}}function f(){let{productTotal:e,shippingFee:t,finalTotal:n}=d();document.querySelector(`.cart-summary__product-total`).textContent=`총 상품금액 : ₩${u(e)}`,document.querySelector(`.cart-summary__shipping`).textContent=`배송비 : ₩${u(t)}`,document.querySelector(`.cart-summary__final-total`).textContent=`총 결제금액 : ₩${u(n)}`}r.addEventListener(`click`,()=>{let r=[...document.querySelectorAll(`.cart__checkbox-input:checked`)].map(e=>Number(e.id));console.log(r);let s=i().filter(e=>!r.includes(e.id));a(s),r.forEach(e=>{t.delete(e)}),o(),p(),f(),e(),n.checked=!1,console.log(s)}),n.addEventListener(`change`,e=>{document.querySelectorAll(`.cart__checkbox-input`).forEach(r=>{n.checked&&t.add(Number(r.id)),n.checked||t.delete(Number(r.id)),r.checked=e.target.checked}),f()});function p(){let e=i();document.querySelector(`.cart__count-value`).textContent=e.length}