import "modern-normalize";
import "../../css/style.css";

import "../modules/header.js";
import "../../js/modules/footer.js";

renderHeader();

import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../css/pages/detail.css";
import { renderTabs } from "../modules/tabs.js";

renderTabs();
