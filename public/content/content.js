function addWishlistButtons() {
  const catalog = document.querySelector("#catalog-grid");
  if (!catalog) return;

  const items = catalog.querySelectorAll("li");
  items.forEach(li => {
    if (li.querySelector(".wishlist-btn")) return; // чтобы не дублировать кнопку

    const title = li.querySelector(".product-title")?.innerText || "No title";
    const brand = li.querySelector(".brand-name")?.innerText || "Unknown";
    const price = li.querySelector(".product-price")?.innerText || "0";
    const url = li.querySelector("a")?.href || "";
    const img = li.querySelector("img")?.src || "";

    const btn = document.createElement("button");
    btn.textContent = "Вишлист";
    btn.className = "wishlist-btn";
    btn.style.cssText = `
      margin: 5px;
      padding: 5px 10px;
      background: #e83e8c;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    btn.addEventListener("click", () => {
      chrome.runtime.sendMessage({
        action: "addProduct",
        product: {
          title,
          brand,
          price,
          url,
          image: img,
          category: "Обувь"
        }
      }, (res) => {
          if (res?.status === "ok") {
            btn.textContent = "✅ Добавлено";
            btn.disabled = true;
          }
        });
      });

    li.appendChild(btn);
  });
}

// Запускаем после загрузки страницы
document.addEventListener("DOMContentLoaded", addWishlistButtons);

// Отслеживаем динамически подгружаемые элементы
const observer = new MutationObserver(addWishlistButtons);
observer.observe(document.body, { childList: true, subtree: true });
