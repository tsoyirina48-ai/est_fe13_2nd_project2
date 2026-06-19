import "../modules/header.js";
import "../../js/modules/footer.js";

import { addToCart, getCartCount, updateCartCount } from "../utils/common.js";

updateCartCount();
const selectedIds = new Set();

const selectAllCheckbox = document.querySelector(".cart__select-all-checkbox");
const selectDeleteBtn = document.querySelector(".cart__delete-btn");

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) ?? [];
}
function saveCartItems(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function renderCart() {
  const cartItems = getCartItems();

  const cartList = document.querySelector(".cart__list");

  cartList.innerHTML = "";

  const html = cartItems
    .map(
      item => `
            <li class="cart__item">
              <input
                type="checkbox"
                id="${item.id}"
                class="cart__checkbox-input"
                ${selectedIds.has(item.id) ? "checked" : ""}
              >

              <label for="${item.id}" class="cart__checkbox-label">
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
              <img src="${item.thumb}" alt="" class="cart__product-image">
              <div class="cart__product-info">
                <p class="cart__product-brand">${item.brand}</p>

                <h3 class="cart__product-name">${item.title}</h3>

                <p class="cart__product-price">₩${formatPrice(item.price)}</p>
                <div class="cart__quantity-control">
                  <button
                    type="button"
                    data-id="${item.id}"
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
                  <span class="cart__quantity"> ${item.qty} </span>
                  <button
                    type="button"
                    data-id="${item.id}"
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
    `,
    )
    .join("");
  cartList.innerHTML = html;

  if (cartItems.length === 0) {
    selectAllCheckbox.disabled = true;
    cartList.innerHTML = `
    <li class="cart__empty">
      <h2>장바구니가 비어있습니다.</h2>
      <a href="../est_fe13_2nd_project/productList">한번 둘러볼까요?</a>
    </li>
  `;
  }
}

function increaseQty(id) {
  const cartItems = getCartItems();

  const item = cartItems.find(item => item.id === id);

  item.qty += 1;

  saveCartItems(cartItems);
  updateCartCount();
  renderCart();
  renderSummary();
}

function decreaseQty(id) {
  const cartItems = getCartItems();

  const item = cartItems.find(item => item.id === id);

  if (item.qty > 1) {
    item.qty -= 1;
  }

  saveCartItems(cartItems);
  updateCartCount();
  renderCart();
  renderSummary();
}

const cartList = document.querySelector(".cart__list");

cartList.addEventListener("click", event => {
  const increaseButton = event.target.closest(".cart__quantity-btn--increase");
  const decreaseButton = event.target.closest(".cart__quantity-btn--decrease");

  if (increaseButton) {
    const cartProductId = Number(increaseButton.dataset.id);
    increaseQty(cartProductId);
  }

  if (decreaseButton) {
    const cartProductId = Number(decreaseButton.dataset.id);
    decreaseQty(cartProductId);
  }
});

cartList.addEventListener("change", event => {
  const checkbox = event.target;

  if (!checkbox.matches(".cart__checkbox-input")) {
    return;
  }

  const id = Number(checkbox.id);

  if (checkbox.checked) {
    selectedIds.add(id);
  } else {
    selectedIds.delete(id);
    selectAllCheckbox.checked = false;
  }
  const checkedItems = document.querySelectorAll(
    ".cart__checkbox-input:checked",
  );
  const checkedIds = [...checkedItems].map(checkbox => Number(checkbox.id));

  if (checkedIds.length === getCartItems().length) {
    selectAllCheckbox.checked = true;
  }

  renderSummary();
});

renderCart();
renderCartCount();
renderSummary();

function formatPrice(price) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

function calculateSummary() {
  const cartItems = getCartItems();

  const productTotal = cartItems
    .filter(item => selectedIds.has(item.id))
    .reduce((sum, item) => sum + item.price * item.qty, 0);

  const shippingFee = 0;

  const finalTotal = productTotal + shippingFee;

  return {
    productTotal,
    shippingFee,
    finalTotal,
  };
}

function renderSummary() {
  const { productTotal, shippingFee, finalTotal } = calculateSummary();

  document.querySelector(".cart-summary__product-total").textContent =
    `총 상품금액 : ₩${formatPrice(productTotal)}`;

  document.querySelector(".cart-summary__shipping").textContent =
    `배송비 : ₩${formatPrice(shippingFee)}`;

  document.querySelector(".cart-summary__final-total").textContent =
    `총 결제금액 : ₩${formatPrice(finalTotal)}`;
}

selectDeleteBtn.addEventListener("click", () => {
  const checkedItems = document.querySelectorAll(
    ".cart__checkbox-input:checked",
  );

  const checkedIds = [...checkedItems].map(checkbox => Number(checkbox.id));

  console.log(checkedIds);
  const cartItems = getCartItems();
  const updatedCart = cartItems.filter(item => !checkedIds.includes(item.id));

  saveCartItems(updatedCart);

  checkedIds.forEach(id => {
    selectedIds.delete(id);
  });

  renderCart();
  renderCartCount();
  renderSummary();
  updateCartCount();

  selectAllCheckbox.checked = false;

  console.log(updatedCart);
});

selectAllCheckbox.addEventListener("change", event => {
  const checkboxes = document.querySelectorAll(".cart__checkbox-input");
  checkboxes.forEach(checkbox => {
    if (selectAllCheckbox.checked) {
      selectedIds.add(Number(checkbox.id));
    }
    if (!selectAllCheckbox.checked) {
      selectedIds.delete(Number(checkbox.id));
    }
    checkbox.checked = event.target.checked;
  });
  renderSummary();
});

function renderCartCount() {
  const cartItems = getCartItems();
  document.querySelector(".cart__count-value").textContent = cartItems.length;
}
