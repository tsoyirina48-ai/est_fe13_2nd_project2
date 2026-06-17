function renderFooter() {
  const siteFooter = document.querySelector(".site__footer");
  siteFooter.innerHTML = `
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
  `;
}

renderFooter();
