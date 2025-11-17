// public/popup.js

const container = document.getElementById('wishlist-container');

chrome.runtime.sendMessage({ action: 'getWishlist' }, ({ wishlist }) => {
  container.innerHTML = '';
  for (const category in wishlist) {
    const catTitle = document.createElement('h3');
    catTitle.textContent = category;
    container.appendChild(catTitle);

    wishlist[category].forEach(product => {
      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${product.title}</strong> - ${product.price} <br>
        <img src="${product.image}" width="50">
      `;
      container.appendChild(div);
    });
  }
});