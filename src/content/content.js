function addWishlistButtons() {
  const catalog = document.querySelector("#catalog-grid");
  if (!catalog) return;

  const items = catalog.querySelectorAll("li");
  items.forEach(li => {
    if (li.querySelector(".wishlist-btn")) return;

    const title = li.querySelector(".product-title")?.innerText || "No title";
    const brand = li.querySelector(".brand-name")?.innerText || "Unknown";
    const price = li.querySelector(".product-price")?.innerText || "0";
    const url = li.querySelector("a")?.href || "";
    const img = li.querySelector("img")?.src || "";

    const btn = document.createElement("button");
    btn.textContent = "Вишлист";
    btn.className = "wishlist-btn";
    btn.style.margin = "5px";
    btn.style.padding = "5px";
    btn.style.background = "#e83e8c";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "4px";
    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "addProduct", product: { title, brand, price, url, img, category: "Обувь" } });
      btn.textContent = "✅ Добавлено";
      btn.disabled = true;
    });

    li.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", addWishlistButtons);

const observer = new MutationObserver(addWishlistButtons);
observer.observe(document.body, { childList: true, subtree: true });