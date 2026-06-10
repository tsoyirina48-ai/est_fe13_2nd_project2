import "modern-normalize";
import "../css/style.css";
import { renderHeader } from "./modules/header.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  const page = document.body.dataset.page;

  switch (page) {
    case "main":
      import("../css/pages/index.css");
      import("./pages/index.js");
      break;
    case "404":
      import("../css/pages/404.css");
  }
});
