// src/content/content.js

// Функция для добавления кнопки на карточку товара
function addWishlistButton(card) {
  if (card.querySelector('.wishlist-btn')) return; // чтобы не дублировать кнопку

  const button = document.createElement('button');
  button.textContent = 'Добавить в вишлист';
  button.className = 'wishlist-btn';
  button.style.marginTop = '5px';
  button.style.cursor = 'pointer';
  card.appendChild(button);

  button.addEventListener('click', () => {
    const product = {
      title: card.querySelector('.product-title')?.innerText || 'Без названия',
      price: card.querySelector('.product-price')?.innerText || '0',
      image: card.querySelector('img')?.src || '',
      category: card.dataset.category || 'Без категории',
      url: window.location.href
    };
    chrome.runtime.sendMessage({ action: 'addProduct', product });
    button.textContent = 'Добавлено!';
    button.disabled = true;
  });
}

// Функция для поиска всех карточек на странице
function scanProducts() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => addWishlistButton(card));
}

// Если товары уже есть при загрузке
document.addEventListener('DOMContentLoaded', scanProducts);

// Если товары подгружаются динамически
const observer = new MutationObserver(scanProducts);
observer.observe(document.body, { childList: true, subtree: true });