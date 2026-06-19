import "../../css/style.css";
import "../../css/login.css";
import "../modules/header.js";
import "../modules/footer.js";

const form = document.querySelector(".login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

form?.addEventListener("submit", event => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("이메일과 비밀번호를 모두 입력하세요.");
    return;
  }

  if (!emailInput.validity.valid) {
    alert("올바른 이메일 형식으로 입력하세요.");
    emailInput.focus();
    return;
  }

  alert("로그인되었습니다.");
});


