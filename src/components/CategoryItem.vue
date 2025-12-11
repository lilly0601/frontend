<template>
  <div class="p-4">
    <button @click="$router.back()" class="mb-2 text-sm text-pink-500">⬅ Назад</button>
    <h2 class="text-xl font-bold mb-2">{{ category }} ({{ products.length }})</h2>
    <ul>
      <li v-for="product in products" :key="product.url" class="mb-2 flex items-center gap-2">
        <img :src="product.img" width="50" />
        <div>
          <div>{{ product.brand }}</div>
          <strong>{{ product.title }}</strong>
          <div>{{ product.price }} KZT</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWishlistStore } from '../stores/wishlistStore';

const route = useRoute();
const category = decodeURIComponent(route.params.name);

const wishlistStore = useWishlistStore();
const products = ref([]);

onMounted(() => {
  chrome.runtime.sendMessage({ action: 'getWishlist' }, ({ wishlist }) => {
    wishlistStore.setWishlist(wishlist);
    products.value = wishlist[category] || [];
  });
});
</script>