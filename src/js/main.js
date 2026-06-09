import { renderHeader } from "./modules/header.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
});

const page = document.body.dataset.page;

switch (page) {
  case "main":
    import("./pages/index.js");
    break;
  case "404":
    import("./pages/404.js");
}
