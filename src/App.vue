<template>
  <div class="w-80">
    <CategoriesList />
    <Wishlist />
  </div>
</template>

<script>
import CategoriesList from './components/CategoriesList.vue';
import Wishlist from './components/Wishlist.vue';

export default {
  components: {
    CategoriesList,
    Wishlist
  }
}
</script>

<style>
/* Можно добавить общие стили для popup */
</style>