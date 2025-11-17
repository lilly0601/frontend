import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWishlistStore = defineStore('wishlist', () => {
  const products = ref([]);
  const selectedCategory = ref(null);

  const addProduct = (product) => {
    products.value.push(product);
  };

  const removeProduct = (url) => {
    products.value = products.value.filter(p => p.url !== url);
  };

  const getCategoryCounts = () => {
    return products.value.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
  };

  return { products, selectedCategory, addProduct, removeProduct, getCategoryCounts };
});