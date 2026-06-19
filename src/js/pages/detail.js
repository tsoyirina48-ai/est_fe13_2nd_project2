import "modern-normalize";
import "../../css/style.css";
import productData from "../../../data/products.json";

import "../modules/header.js";
import "../modules/footer.js";

import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../css/pages/detail.css";

import { addToCart } from "../utils/common.js";

let product = {};

//URLSearchParams mdn
//url 생성자에 전달된 주소를 url.search를 통해 params라는 변수로 검색
function fetchProduct() {
  const params = new URLSearchParams(location.search);
  const productID = params.get("id");
  if (!productID) {
    alert("잘못된 접근입니다. 홈으로 이동하겠습니다.");
    location.href = "./index.html";
  }
  try {
    product = productData.products.find(p => p.id === Number(productID));
    console.log(product);
    createContent(product);
    createRecommendLists(data.products, product.category);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("조회를 종료했습니다.");
  }
}
fetchProduct();

function createContent(data) {
  const title = document.querySelector("#product-title"),
    category = document.querySelectorAll(".product-category"),
    origin_price = document.querySelector(".product-price"),
    discount_badge = document.querySelector(".discount-badge"),
    mainImages = document.querySelectorAll(".main-image img"),
    thumbnailImages = document.querySelectorAll(".product-thumbnails img"),
    brand = document.querySelectorAll(".product-brand"),
    rating = document.querySelectorAll(".rating-score"),
    color = document.querySelector(".product-color");

  title.textContent = data.title;

  //카테고리별 구현 및 이동
  const categoryActions = {
    sunglasses: "showSunglasses",
    lens: "showLens",
    accessory: "showAccessory",
    eyewear: "showEyewear",
  };
  category.forEach(c => {
    c.textContent = data.category;
    const action = categoryActions[data.category];
    if (action) {
      c.href = `./productList.html?action=${action}`;
    }
  });

  //가격
  if (data.sale_rate === 0) {
    origin_price.textContent = `${data.price.toLocaleString()}원`;
    discount_badge.style.visibility = "hidden";
  } else {
    const sale_price = data.price / ((100 - data.sale_rate) / 100);
    origin_price.textContent = `${Math.round(sale_price).toLocaleString()}원`;
    discount_badge.textContent = `-${data.sale_rate}%`;
  }

  //이미지
  mainImages.forEach(m => {
    m.setAttribute("src", data.thumbnail);
    m.setAttribute("alt", data.title);
  });
  thumbnailImages.forEach(t => {
    t.setAttribute("src", data.thumbnailMin);
    t.setAttribute("alt", `${data.title} 썸네일`);
  });

  brand.forEach(b => {
    b.textContent = data.brand;
  });

  //평점
  rating.forEach(r => {
    r.textContent = Number(data.rating).toFixed(1);
  });

  //평점-별
  const productStars = document.querySelector(".product-rating");
  const tabStars = document.querySelector(".review-score");
  renderStars(productStars, Number(data.rating));
  renderStars(tabStars, Number(data.rating));

  color.textContent = data.color;

  //상세설명
  const aboutText = document.querySelector(".About p");
  aboutText.textContent = getBrandDescription(data.brand);

  // 스타일
  const style = document.querySelector(".product-style");
  style.textContent = getProductStyle(data);

  // 소재
  const materials = document.querySelectorAll(".product-material");
  materials.forEach(m => {
    m.textContent = getProductMaterial(data);
  });
}

function renderStars(starContainer, score) {
  const starIcons = starContainer.querySelectorAll(".stars .material-icons");
  const roundedScore = Math.round(score * 2) / 2;

  starIcons.forEach((star, index) => {
    const starNumber = index + 1;

    if (roundedScore >= starNumber) {
      star.textContent = "star";
    } else if (roundedScore >= starNumber - 0.5) {
      star.textContent = "star_half";
    } else {
      star.textContent = "star_border";
    }
  });
}

// 상품 정보 탭 구현
const tabs = document.querySelectorAll(".tabs a");
const detailContents = document.querySelectorAll(".detail-content");
tabs.forEach(t => {
  t.addEventListener("click", e => {
    e.preventDefault();

    // 기존 active 제거
    tabs.forEach(tab => {
      tab.classList.remove("active");
    });
    detailContents.forEach(dc => {
      dc.classList.remove("active");
    });

    // 클릭한 탭 active 추가
    t.classList.add("active");

    // href 값을 가져온 후 active 추가
    const id = e.target.getAttribute("href");
    document.querySelector(id).classList.add("active");
  });
});

// 이미지 슬라이드 구현
const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination, Autoplay],
  loop: true,

  // 페이지네이션
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },

  // 오토 슬라이드
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
  },
});
// 썸네일 이미지 클릭시 해당 슬라이드로 이동
const thumbnails = document.querySelectorAll(".product-thumbnails img");

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    swiper.slideTo(index);
  });
});

// 좋아요 버튼
const favorite = document.querySelector(".product-brand-like a span");
favorite.addEventListener("click", e => {
  e.preventDefault();
  favorite.classList.toggle("active");
  if (favorite.classList.contains("active")) {
    favorite.textContent = "favorite";
  } else {
    favorite.textContent = "favorite_border";
  }
});

// 상품 수량 변경하기
const quantity_control = document.querySelector(".quantity-control");
const quantity = document.querySelector("#quantity");
/*
quantity_control 클릭했을 때, 클릭한 그 요소의 가까운 부모가 button이라면
  변수 currentQty id quantity의 내용을 할당
  그 버튼의 내용이 - 와 같다면
    currentQty를 1 차감
  아니라면
    currentQty를 1 증가
*/
quantity_control.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  let currentQty = Number(quantity.value);
  if (btn.textContent === "-") {
    if (currentQty > 1) {
      currentQty--;
    }
  } else {
    currentQty++;
  }
  quantity.value = currentQty;
});

// 장바구니 추가 버튼
// 현재 수량을 addToCart 함수에 인수를 넣어 실행
const productForm = document.querySelector(".product-form");
const addcart = document.querySelector(".add-cart");
const share = document.querySelector(".share");
addcart.addEventListener("click", () => {
  addToCart(product, Number(quantity.value));
});

// 즉시 구매 버튼
// 현재 수량을 addToCart 함수에 인수를 넣어 실행 및 cart.html로 이동
productForm.addEventListener("submit", e => {
  e.preventDefault();

  // 현재 상품과 수량을 장바구니에 추가
  addToCart(product, Number(quantity.value));
  // 장바구니 페이지로 이동
  location.href = "./cart.html";
});

// 공유 버튼 : 클릭시 사이트 url 복사
share.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    alert("페이지 주소가 복사되었습니다.");
  } catch (error) {
    console.error(error);
    alert("주소 복사에 실패했습니다.");
  }
});

const lastCategory = document.querySelector(".detail_category .product-brand");
lastCategory.addEventListener("click", e => {
  e.preventDefault();
});

// 브랜드별 상세 설명 추가
function getBrandDescription(brand) {
  switch (brand) {
    case "RAY-BAN":
      return `클래식은 영원하다, 레이밴 SINCE 1937. 시간이 증명하는 글로벌 아이웨어 브랜드. '빛(Ray)을 막아준다(Ban)'는 이름처럼 선글라스 본연의 역할에 집중하며 누구나 어울리는 클래식한 디자인을 선보입니다.`;

    case "BLIZ":
      return `블리츠는 2007년 스웨덴에서 시작된 스포츠 아이웨어 브랜드로 북유럽 시장에서 인기가 높으며 특히 크로스 컨트리 스키 선수들의 좋은 평가를 받으며 단기간에 브랜드 명성을 쌓았습니다.`;

    case "PUBLIC BEACON":
      return `퍼블릭비컨은 문화와 예술을 재해석해 새로운 스타일로 승화한 패션 아이웨어 브랜드입니다. 클래식과 모던을 아우르는 감각적인 디자인으로 셀럽은 물론, 다양한 연령대에서 사랑받고 있어요.`;

    case "MUSEUM BY BEACON":
      return `시간을 초월하는 가치의 빛남을 일깨워주는 클래식. 뮤지엄바이비컨은 그런 클래식 작품이 모여 있는 박물관을 꿈꿉니다. 세월이 흘러도 고유한 매력을 풍기는 스타일을 만나보세요.`;

    case "FAKEME":
      return `페이크미의 제품은 트렌드를 쫓지 않고 미의 다양성을 이야기합니다. 온전히 당신다움으로 충분히 아름답다는 메시지를 전달함과 동시에 스스로를 찾아가는 영감이 되는 것을 목표로 합니다.`;

    case "RUDY PROJECT":
      return `1985년에 탄생한 스포츠글라스 전문 브랜드 루디 프로젝트는 제품의 기획, 디자인, 생산, 마케팅까지 모두 이태리에서 이루어지는 명품 브랜드 입니다.`;

    case "OAKLEY":
      return `고도의 광학기술과 첨단 디자인을 융합시킨 세계 최고의 브랜드 오클리. 누구도 따라할 수 없는 독창적인 고성능 아이웨어를 선보입니다.`;

    case "PRADA":
      return `오랜역사를 가지고 있는 세계적인 명품패션 브랜드 프라다. 유행을 따라가지 않고 프라다만의 우아함, 도시적이고 심플한 이미지를 아이웨어에서도 보여주고 있습니다.`;

    case "LE SPECS":
      return `호주 Sunshade사의 브랜드로 섹시한 색감과 유니크한 디자인의 선글라스를 부담없는 가격에 판매함으로써 호주 국민 아이웨어라 불리며 많은 사랑을 받고 있습니다. 국내에서도 많은 셀럽들이 선택하여 패션 아이웨어로 자리를 차지하고 있습니다.`;

    case "STYLE:WORK":
      return `개인의 취향을 중시 여기는 동시에 가장 중요한 것은 밸런스를 잃지 않는 것입니다. 탄탄한 밸런스로 설계된 아이웨어로 데일리 스타일을 완성하세요.`;

    case "ROUNZ BASIC":
      return `고급안경은 가격이 부담되고, 저가안경은 퀄리티가 실망스러웠나요? 기본은 탄탄하게, 하지만 가격 부담은 적게. 라운즈 베이직으로 더 나은 안경라이프를 누리세요`;

    case "VEDI VERO":
      return `이탈리아어로 ‘진실을 보다(See the Truth)’란 의미의 베디베로. 베디베로를 통해 사람들이 진실을 마주하고 진정성을 담아 만든다는 철학으로 탄생했습니다. 타협하지 않는 퀄리티의 재료와 뛰어난 만듦새를 통해 독창적인 디자인은 물론 편안한 착용감을 선사합니다.`;

    case "HEISTER":
      return `하이스터 아이웨어는 착용자 원하는 얼굴표현을 마치 영화처럼 훔쳐내어 제공하고자 합니다. 세상을 강탈하듯 자신의 스타일과 서사를 찾으세요. 하이스터는 당신이 원하는 변화를 만듭니다.`;

    case "NINE ACCORD":
      return `클래식과 새로운 것을 개발하고 방대한 안경 지식과 전문지식의 스펙트럼을 반영하여 아름답고 독창적인 디자인을 만들어가고 있습니다.`;

    case "NISHIDE KAZUO":
      return `일본 후쿠이 사바에의 40년 안경인 니시데카즈오, 자신의 이름을 건 브랜드로 핸드메이드 티타늄 컬렉션을 선보이며, 여러 브랜드의 안경들이 넘쳐나는 현대에 역행하듯 철저하게 필요한 부분을 깎아 착용했을때의 의식할 수 없을 정도로 가벼운 안경 과하지 않은 빈티지함과 모던함을 베이스로 둔 디자인이 특징인 브랜드입니다.`;

    default:
      return `브랜드 소개 정보가 준비 중입니다.`;
  }
}

// 상품 STYLE
function getProductStyle(product) {
  const title = product.title.toUpperCase();
  const brand = product.brand.toUpperCase();

  // 스포츠 / 고글 계열
  if (
    title.includes("고글") ||
    title.includes("스포츠") ||
    title.includes("컷라인") ||
    title.includes("스핀에어") ||
    title.includes("수트로") ||
    title.includes("홀브룩") ||
    title.includes("아이자켓") ||
    brand === "BLIZ" ||
    brand === "RUDY PROJECT" ||
    brand === "OAKLEY"
  ) {
    return "Sporty";
  }

  // 형태가 확실한 제품
  if (title.includes("캣아이")) {
    return "Cat Eye";
  }

  if (title.includes("라운드")) {
    return "Round";
  }

  if (title.includes("오벌")) {
    return "Oval";
  }

  // 클립 / 렌즈 / 악세서리 계열
  if (title.includes("CLIP") || title.includes("클립")) {
    return "Clip-on";
  }

  if (title.includes("렌즈")) {
    return "Lens";
  }

  // 패션 아이웨어 성향 브랜드
  if (
    brand === "PRADA" ||
    brand === "LE SPECS" ||
    brand === "VEDI VERO" ||
    brand === "PUBLIC BEACON" ||
    brand === "MUSEUM BY BEACON" ||
    brand === "FAKEME" ||
    brand === "HEISTER"
  ) {
    return "Fashion";
  }

  // 클래식 성향 브랜드
  if (
    brand === "RAY-BAN" ||
    brand === "ROUNZ BASIC" ||
    brand === "STYLE:WORK" ||
    brand === "NINE ACCORD" ||
    brand === "NISHIDE KAZUO"
  ) {
    return "Classic";
  }

  return "Classic";
}

// 상품 Material
function getProductMaterial(product) {
  const title = product.title.toUpperCase();
  const brand = product.brand.toUpperCase();
  const category = product.category.toLowerCase();

  // 렌즈 단독 상품
  if (category === "lens" || title.includes("렌즈")) {
    return "Lens";
  }

  // 클립 악세서리
  if (title.includes("CLIP") || title.includes("클립")) {
    return "Metal";
  }

  // 티타늄 계열
  if (
    title.includes("베타티타늄") ||
    title.includes("티타늄") ||
    title.startsWith("TI ") ||
    brand === "NISHIDE KAZUO"
  ) {
    return "Titanium";
  }

  // 메탈 계열
  if (
    title.includes("메탈") ||
    title.includes("하금테") ||
    title.includes("실버") ||
    title.includes("골드")
  ) {
    return "Metal";
  }

  // TR90 소재
  if (title.includes("TR90")) {
    return "TR90";
  }

  // 아세테이트 / 뿔테 계열
  if (
    title.includes("아세테이트") ||
    title.includes("하바나") ||
    title.includes("톨토이즈") ||
    title.includes("데미브라운")
  ) {
    return "Acetate";
  }

  // 스포츠 고글 계열은 보통 가벼운 플라스틱/나일론 프레임 느낌
  if (
    title.includes("고글") ||
    title.includes("스포츠") ||
    brand === "BLIZ" ||
    brand === "OAKLEY" ||
    brand === "RUDY PROJECT"
  ) {
    return "Plastic";
  }

  // 패션 선글라스 브랜드 기본값
  if (
    brand === "PUBLIC BEACON" ||
    brand === "MUSEUM BY BEACON" ||
    brand === "FAKEME" ||
    brand === "LE SPECS" ||
    brand === "VEDI VERO" ||
    brand === "HEISTER" ||
    brand === "PRADA"
  ) {
    return "Acetate";
  }

  return "Plastic";
}
