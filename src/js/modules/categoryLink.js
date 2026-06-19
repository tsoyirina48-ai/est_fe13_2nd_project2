export function applyUrlFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get("action");

  if (action === "showSunglasses") {
    const checkbox = document.querySelector('input[value="sunglasses"]');
    if (checkbox) {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    }
  } else if (action === "showLens") {
    const checkbox = document.querySelector('input[value="lens"]');
    if (checkbox) {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    }
  } else if (action === "showAccessory") {
    const checkbox = document.querySelector('input[value="accessory"]');
    if (checkbox) {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    }
  } else if (action === "showEyewear") {
    const checkbox = document.querySelector('input[value="eyewear"]');
    if (checkbox) {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
}
