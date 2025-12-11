// 


const container = document.getElementById("products-container");

function loadWishlist() {
  chrome.runtime.sendMessage({ action: "fetchWishlist" }, (response) => {
    container.innerHTML = "";

    if (!response.success) {
      container.textContent = "Ошибка: " + response.error;
      return;
    }

    const wishlist = response.data;

    for (const category in wishlist) {
      const catTitle = document.createElement("h3");
      catTitle.textContent = category;
      container.appendChild(catTitle);

      wishlist[category].forEach((product) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <strong>${product.Product.name}</strong> — ${product.Product.price}<br>
          <img src="${product.Product.image_url}" width="50"><br><br>
        `;
        container.appendChild(div);
      });
    }
  });
}

// Запуск
loadWishlist();