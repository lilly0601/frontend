<template>
  <div class="flex flex-col  min-h-screen bg-gradient-to-b from-red-50 via-white to-red-100 relative overflow-hidden p-4">

    <!-- Снежинки -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div v-for="n in 20" :key="n" class="snowflake" :style="randomSnowflakeStyle()">❄️</div>
    </div>

    <h1 class="text-4xl font-bold text-red-600 mb-6 text-center animate-bounce">🎄 Ваш Wishlist 🎁</h1>

    <!-- Список товаров -->
    <div class="">
      <div 
        class="flex justify-between bg-white p-4 rounded-[10px]"
        v-for="item in productsList"
        :key="item.id"
        @click="openItem(item)"
        
        >
        <div class="flex flex-col">
          <h2 class="font-bold text-lg text-red-600">{{ item.name || "Товар #" + item.id }}</h2>
          <p class="text-green-700 text-sm mt-1 truncate">{{ item.Product.name || "Без названия" }}</p>
          <span class="text-green-700 text-sm mt-1 truncate">{{ item.Product.price || "Нет цены" }}</span>
        </div>
        <div class="w-12 h-12 mt-2">
          <img 
            :src="item.Product?.image_url || '/images/default-product.jpg'" 
            alt="Product Image"
            class="w-full h-full object-contain rounded-md"
          />
        </div>
      </div>
    </div>
    

    <!-- Модальное окно редактирования -->
    <div v-if="selectedItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
        <button @click="closeModal" class="absolute top-3 right-3 text-red-500 font-bold text-xl">&times;</button>
        <h2 class="text-2xl font-bold text-red-600 mb-4">{{ selectedItem.name || "Товар #" + selectedItem.id }}</h2>
        <label class="block text-green-700 mb-2">Заметка о товаре:</label>
        <textarea
          v-model="selectedItem.note"
          class="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-500 outline-none resize-none"
          rows="4"
        ></textarea>
        <button
          @click="saveItem"
          class="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold transition-all duration-200"
        >
          Сохранить
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useWishlistStore } from "../stores/wishlistStore.js";
import axios from "axios";

export default {
  name: "Wishlist",
  setup() {
    const wishlistStore = useWishlistStore();
    const selectedItem = ref(null);

    // Загрузка wishlist с сервера
    const loadWishlistItems = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) throw new Error("JWT token not found");

        const res = await axios.get("http://localhost:3000/api/wishlist/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          wishlistStore.setWishlist(res.data);
        }
      } catch (err) {
        console.error("Failed to load wishlist:", err.response?.data || err.message);
      }
    };

    // Подписка на пуши
    const subscribeToPush = async () => {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

      const reg = await navigator.serviceWorker.register("/sw.js");
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY)
      });

      const token = localStorage.getItem("jwt");
      const userId = 1; // или получить из store

      await axios.post("http://localhost:3000/api/push/subscribe", {
        subscription,
        userId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    };

    const urlBase64ToUint8Array = (base64String) => {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
    };

    onMounted(() => {
      loadWishlistItems();
      subscribeToPush();
    });

    // Методы
    const openItem = (item) => selectedItem.value = { ...item };
    const closeModal = () => selectedItem.value = null;
    const saveItem = () => {
      const index = wishlistStore.products.findIndex(p => p.id === selectedItem.value.id);
      if (index !== -1) {
        wishlistStore.products[index] = { ...selectedItem.value };
      }
      closeModal();
    };

    const randomSnowflakeStyle = () => {
      const size = Math.random() * 1.5 + 0.8;
      const left = Math.random() * 100;
      const duration = Math.random() * 5 + 5;
      const delay = Math.random() * 5;
      return { left: `${left}%`, fontSize: `${size}rem`, animationDuration: `${duration}s`, animationDelay: `${delay}s` };
    };

    // Компьютед свойства
    const productsList = computed(() => wishlistStore.products || []);

    return { selectedItem, openItem, closeModal, saveItem, randomSnowflakeStyle, productsList };
  }
};
</script>

<style scoped>
.snowflake {
  position: absolute;
  top: -10%;
  opacity: 0.8;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes fall {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(50vh) rotate(180deg); }
  100% { transform: translateY(110vh) rotate(360deg); }
}
</style>