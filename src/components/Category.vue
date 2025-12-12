<template>
  <div class="p-6">

    <!-- Кнопка категорий -->
    <button
      @click="showCategories = !showCategories"
      class="px-4 py-2 bg-red-400 text-white rounded-xl mb-4"
    >
      Категории
    </button>

    <!-- Выпадающий список -->
    <div v-if="showCategories" class="bg-white shadow-lg rounded-xl p-4 mb-6">
      <h2 class="text-lg font-bold mb-2">Категории:</h2>

      <div v-if="loadingCategories">Загрузка...</div>

      <ul v-else>
        <li
          v-for="cat in categories"
          :key="cat.id"
          class="py-2 px-3 bg-red-50 rounded-lg mb-2 border hover:bg-red-100 cursor-pointer"
        >
          {{ cat.name }}
        </li>
      </ul>
    </div>

    <!-- Wishlist -->
    <h2 class="text-lg font-bold mb-2">Ваш wishlist:</h2>

    <div v-if="loadingWishlist">Загрузка wishlist...</div>

    <ul v-else>
      <li
        v-for="item in wishlist"
        :key="item.id"
        class="py-2 px-3 bg-green-50 rounded-lg mb-2 border hover:bg-green-100"
      >
        {{ item.product.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '../stores/categoryStore';
import { storeToRefs } from 'pinia';

const showCategories = ref(false);

const store = useCategoryStore();

// Делаем reactivity
const { categories, wishlist, loadingCategories, loadingWishlist, error } =
  storeToRefs(store);

onMounted(async () => {
  await store.loadCategories();
  await store.loadWishlist();
});
</script>