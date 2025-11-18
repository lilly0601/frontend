<template>
  <div>
    <h2>Мой Вишлист</h2>
    <div v-for="(products, category) in wishlist" :key="category" style="margin-bottom: 10px;">
      <button 
        @click="openCategory(category)" 
        style="width:100%; text-align:left; padding:5px; cursor:pointer;">
        {{ category }} ({{ products.length }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const wishlist = ref({});

onMounted(() => {
  chrome.runtime.sendMessage({ action: 'getWishlist' }, ({ wishlist: data }) => {
    wishlist.value = data;
  });
});

function openCategory(category) {
  chrome.tabs.create({
    url: `category.html?category=${encodeURIComponent(category)}`
  });
}
</script>