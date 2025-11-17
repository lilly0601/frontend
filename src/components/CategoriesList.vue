<template>
  <div class="p-4 border-b mb-2">
    <h2 class="font-bold mb-2">Категории</h2>
    <CategoryItem
      v-for="cat in categories"
      :key="cat.name"
      :category="cat.name"
      :count="cat.count"
      @select="selectCategory"
    />
  </div>
</template>

<script>
import CategoryItem from './CategoryItem.vue';
import { useWishlistStore } from '../store/wishlist.js';

export default {
  components: { CategoryItem },
  setup() {
    const store = useWishlistStore();

    const categories = computed(() => {
      const counts = store.getCategoryCounts();
      return Object.keys(counts).map(name => ({ name, count: counts[name] }));
    });

    const selectCategory = (cat) => {
      store.selectedCategory = cat;
    };

    return { categories, selectCategory };
  }
}
</script>