// public/background.js

// Функция для сохранения товара
function saveProduct(product) {
  chrome.storage.local.get({ wishlist: {} }, ({ wishlist }) => {
    const category = product.category || 'Без категории';
    if (!wishlist[category]) wishlist[category] = [];
    
    // Проверка, чтобы не дублировать один и тот же товар по URL
    const exists = wishlist[category].some(item => item.url === product.url);
    if (!exists) wishlist[category].push(product);

    chrome.storage.local.set({ wishlist });
  });
}

// Слушаем сообщения от content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addProduct') {
    saveProduct(message.product);
    sendResponse({ status: 'ok' });
  } else if (message.action === 'getWishlist') {
    chrome.storage.local.get({ wishlist: {} }, ({ wishlist }) => {
      sendResponse({ wishlist });
    });
    // Чтобы sendResponse сработал асинхронно
    return true;
  }
});