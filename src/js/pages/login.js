import '../modules/header.js';

renderHeader();
const form = document.querySelector(".login-form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (!email || !password) {
    alert("이메일과 비밀번호를 모두 입력해주세요.");
    return;
  }

  alert("로그인되었습니다.");
});