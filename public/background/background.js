// 

// background.js
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "fetchWishlist") {
    try {
      // Берем токен из chrome.storage
      chrome.storage.local.get(["jwt"], async ({ jwt }) => {
        if (!jwt) {
          sendResponse({ success: false, error: "JWT not found" });
          return;
        }

        const res = await fetch("http://localhost:3000/api/wishlist/all", {
          headers: { Authorization: `Bearer ${jwt}` },
        });

        const data = await res.json();
        sendResponse({ success: true, data });
      });
    } catch (err) {
      sendResponse({ success: false, error: err.message });
    }
    return true; // важно для асинхронного sendResponse
  }
});