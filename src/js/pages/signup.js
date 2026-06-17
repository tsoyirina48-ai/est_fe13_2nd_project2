import '../modules/header.js';

renderHeader();

const form = document.querySelector(".signup-form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const passwordConfirm = document.querySelector("#password-confirm").value.trim();

  if (!name || !email || !password || !passwordConfirm) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  if (password !== passwordConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  alert("회원가입이 완료되었습니다.");
});