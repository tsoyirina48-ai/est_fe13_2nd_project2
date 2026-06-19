import "../../css/style.css";
import "../../css/signup.css";
import "../modules/header.js";

const form = document.querySelector(".signup-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordConfirmInput = document.querySelector("#password-confirm");

form?.addEventListener("submit", event => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordConfirm = passwordConfirmInput.value.trim();

  if (!name || !email || !password || !passwordConfirm) {
    alert("모든 항목을 입력하세요.");
    return;
  }

  if (!emailInput.validity.valid) {
    alert("올바른 이메일 형식으로 입력하세요.");
    emailInput.focus();
    return;
  }

  if (password.length < 8) {
    alert("비밀번호는 8자 이상 입력하세요.");
    passwordInput.focus();
    return;
  }

  if (password !== passwordConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    passwordConfirmInput.focus();
    return;
  }

  alert("회원가입이 완료되었습니다.");
});

import "../modules/footer.js";
