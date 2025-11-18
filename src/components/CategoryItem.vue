<template>
  <div>
    <button @click="$router.back()">⬅ Назад</button>
    <h2>{{ category }} ({{ products.length }})</h2>
    <ul>
      <li v-for="product in products" :key="product.url" style="margin-bottom:10px;">
        <img :src="product.img" width="50" /> {{ product.brand }} — {{ product.title }} — {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWishlistStore } from '../store/wishlist';
import { useRoute } from 'vue-router';

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