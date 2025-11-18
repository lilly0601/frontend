import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWishlistStore = defineStore('wishlist', () => {
  const categories = ref([]);       // список категорий
  const products = ref({});         // товары по категориям

  function setWishlist(newWishlist) {
    categories.value = Object.keys(newWishlist);
    products.value = newWishlist;
  }

  function addProduct(category, product) {
    if (!products.value[category]) products.value[category] = [];
    const exists = products.value[category].some(p => p.url === product.url);
    if (!exists) products.value[category].push(product);
  }

  return { categories, products, setWishlist, addProduct };
});