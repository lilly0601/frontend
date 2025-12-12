<template>
  <div class="card">
    <img :src="product.img" width="50" />
    <div class="flex-1">
      <strong>{{ product.title }}</strong>
      <div>{{ product.brand }}</div>
      <div>{{ product.price }}₸</div>

      <!-- Кнопка добавления в wishlist -->
      <button
        v-if="!isInWishlist"
        @click="addToWishlist"
        class="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg"
      >
        В избранное
      </button>

      <span v-else class="text-green-600 font-bold mt-2 block">
        В избранном
      </span>
    </div>
  </div>
</template>

<script>
import { useWishlistStore } from "../stores/wishlistStore";
import { computed } from "vue";

export default {
  props: ['product'],
  setup(props) {
    const wishlistStore = useWishlistStore();

    // Проверяем, есть ли товар в wishlist
    const isInWishlist = computed(() => {
      return wishlistStore.products.some(p => p.id === props.product.id);
    });

    // Функция добавления в wishlist
    const addToWishlist = () => {
      wishlistStore.addToWishlist(props.product);
    };

    return { addToWishlist, isInWishlist };
  }
};
</script>

<style>
.card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>