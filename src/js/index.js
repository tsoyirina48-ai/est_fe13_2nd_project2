import "../css/pages/index.css";

const tabsContianer = document.querySelector(".tabs__container");
const tabsList = tabsContianer.querySelector(".tabs__list");
const tabButtons = tabsList.querySelectorAll(".tab__buttons");
const tabPanels = tabsContianer.querySelectorAll(".tabs__panels > div");

tabsList.setAttribute("role", "tablist");
tabButtons.forEach((tab, index) => {
  if (index === 0) {
  } else {
    tab.setAttribute("tabindes", "-1");
    tabPanels[index].setAttribute("hidden", "");
  }
});

tabPanels.forEach(panel => {
  panel.setAttribute("tabindex", "0");
});

tabsContianer.addEventListener("click", e => {
  const clickedTab = e.target.closest("a");
  if (!clickedTab) return;

  e.preventDefault();

  switchTab(clickedTab);
});

function switchTab(newTab) {
  const activePanelId = newTab.getAttribute("href");
  const activePanel = tabsContianer.querySelector(activePanelId);

  tabPanels.forEach(panel => {
    panel.setAttribute("hidden", "");
  });
  activePanel.removeAttribute("hidden");
}
