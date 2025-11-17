<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">Вишлист</h2>
    <div v-if="filteredProducts.length === 0" class="text-gray-500">Нет товаров</div>
    <WishlistItem
      v-for="item in filteredProducts"
      :key="item.url"
      :item="item"
      @remove="removeProduct"
    />
  </div>
</template>

<script>
import { useWishlistStore } from '../store/wishlist.js';
import WishlistItem from './WishlistItem.vue';

export default {
  components: { WishlistItem },
  setup() {
    const store = useWishlistStore();
    const removeProduct = (url) => {
      store.removeProduct(url);
    };
    // Фильтрация по выбранной категории
    const filteredProducts = computed(() => {
      if (!store.selectedCategory) return store.products;
      return store.products.filter(p => p.category === store.selectedCategory);
    });

    return { filteredProducts, removeProduct };
  }
}
</script>