<template>
  <div class="p-6">

    <!-- КНОПКА ПОКАЗАТЬ КАТЕГОРИИ -->
    <button
      @click="showCategories = !showCategories"
      class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl mb-4"
    >
      Категории
    </button>

    <!-- СПИСОК КАТЕГОРИЙ -->
    <div v-if="showCategories" class="bg-white p-4 rounded-xl shadow mb-6">
      <h2 class="text-lg font-bold mb-2 text-red-600">Категории</h2>

      <div v-if="loadingCategories">Загрузка...</div>

      <ul v-else>
        <li
          v-for="cat in categories"
          :key="cat.id"
          @click="selectCategory(cat.id)"
          class="py-2 px-3 bg-red-50 rounded-lg mb-2 border hover:bg-red-100 cursor-pointer"
        >
          {{ cat.name }}
        </li>
      </ul>
    </div>

    <!-- НАЗВАНИЕ ВЫБРАННОЙ КАТЕГОРИИ -->
    <div v-if="selectedCategoryName" class="mb-4">
      <h2 class="text-xl font-bold text-red-600">
        Товары в категории: {{ selectedCategoryName }}
      </h2>
    </div>

    <!-- ЗАГРУЗКА ТОВАРОВ -->
    <div v-if="loadingWishlist">Загрузка товаров...</div>

    <!-- СПИСОК ТОВАРОВ -->
    <ul v-else>
      <li
        v-for="item in filteredWishlist"
        :key="item.id"
        class="py-2 px-3 bg-green-50 rounded-lg mb-2 border hover:bg-green-100"
      >
        {{ item.product?.name || "Неизвестный товар" }} —
        {{ item.product?.price || 0 }}₸
      </li>

      <p
        v-if="filteredWishlist.length === 0 && !loadingWishlist"
        class="text-gray-500"
      >
        В этой категории пока нет товаров.
      </p>
    </ul>

  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useCategoryStore } from "../stores/categoryStore";
import { storeToRefs } from "pinia";

export default {
  name: "Category",

  setup() {
    const store = useCategoryStore();

    const showCategories = ref(false);
    const selectedCategoryId = ref(null);

    const {
      categories,
      wishlist,
      loadingCategories,
      loadingWishlist,
      error,
    } = storeToRefs(store);

    // Загружаем категории и wishlist
    onMounted(async () => {
      await store.loadCategories();
      await store.loadWishlist();
    });

    const selectCategory = (id) => {
      selectedCategoryId.value = id;
      showCategories.value = false;
    };

    const selectedCategoryName = computed(() => {
      const cat = categories.value.find(
        (c) => c.id === selectedCategoryId.value
      );
      return cat ? cat.name : null;
    });

    // Фильтруем товары
    const filteredWishlist = computed(() => {
      // Убираем элементы без product
      const valid = wishlist.value.filter((i) => i.product);

      if (!selectedCategoryId.value) return valid;

      return valid.filter(
        (item) => item.product.category_id === selectedCategoryId.value
      );
    });

    return {
      showCategories,
      selectCategory,
      selectedCategoryId,
      selectedCategoryName,
      categories,
      wishlist,
      filteredWishlist,
      loadingCategories,
      loadingWishlist,
      error,
    };
  },
};
</script>