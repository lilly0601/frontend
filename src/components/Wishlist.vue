<template>
  <div>
    <h2>Мой Fashion Wishlist</h2>
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
import { useRouter } from 'vue-router';

const wishlist = ref({});
const router = useRouter();

onMounted(() => {
  chrome.runtime.sendMessage({ action: 'getWishlist' }, ({ wishlist: data }) => {
    wishlist.value = data;
  });
});

function openCategory(category) {
  router.push(`/category/${encodeURIComponent(category)}`);
}
</script>