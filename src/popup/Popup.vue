<template>
  <div class="popup">
    <h2>Fashion Wishlist</h2>
    <div class="categories">
      <button
        v-for="cat in wishlistStore.categories"
        :key="cat"
        @click="selectCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="selectedCategory">
      <h3>{{ selectedCategory }}</h3>
      <ul>
        <li v-for="product in wishlistStore.products[selectedCategory]" :key="product.url">
          <img :src="product.img" width="50">
          {{ product.brand }} — {{ product.title }} — {{ product.price }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useWishlistStore } from '../store/wishlist';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const wishlistStore = useWishlistStore();
    const selectedCategory = ref(null);

    function selectCategory(cat) {
      selectedCategory.value = cat;
    }

    onMounted(() => {
      chrome.runtime.sendMessage({ action: 'getWishlist' }, (response) => {
        wishlistStore.setWishlist(response.wishlist);
      });
    });

    return { wishlistStore, selectedCategory, selectCategory };
  },
};
</script>

<style>
.popup { width: 300px; font-family: Arial; padding: 10px; }
.categories { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
.categories button { background: #e83e8c; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
.categories button:hover { background: #c2185b; }
</style>