// 
// background.js
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "fetchWishlist") {
    try {
      // Берем токен из chrome.storage
      chrome.storage.local.get(["jwt"], async ({ jwt }) => {
        if (!jwt) {
          sendResponse({ success: false, error: "JWT not found!!!" });
          return;
        }

        const res = await fetch("http://localhost:3000/api/wishlist/add", {
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
  else if (message.action === "addProduct") {
    // chrome.storage.local.get(["jwt"], ({ jwt }) => {
    //   if (!jwt) {
    //     sendResponse({ success: false, error: "JWT not foundss" });
    //     return;
    //   }
    
     
    //     // Формируем тело POST запроса
    //     const body = {
    //       product_name: message.product.fullName || message.product.title,
    //       note: message.product.note || ""
    //     };

    //     debugger

    //     // const res = fetch("http://localhost:3000/api/wishlist/add", {
    //     //   method: "POST",
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //     "Authorization": `Bearer ${jwt}`
    //     //   },
    //     //   body: JSON.stringify(body)
    //     // });

    //     // const data = res.json();
    //     sendResponse({ success: true });
    // });
    const jwt = chrome.storage.local.get("jwt", ({ jwt }) => resolve(jwt));

    const body = {
      product_name: message.product.fullName || message.product.title,
      note: message.product.note || ""
    };

    const res = fetch("http://localhost:3000/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(body)
    });

    sendResponse({ success: true });
    return true;
  }
});
