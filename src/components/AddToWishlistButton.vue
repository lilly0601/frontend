<template>
  <button @click="addToWishlist" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    Добавить в Вишлист
  </button>
</template>

<script setup>
const props = defineProps({
  product: Object
});

function addToWishlist() {
  chrome.runtime.sendMessage({ action: 'addToWishlist', product: props.product });
  alert('Товар добавлен в Вишлист!');
}
</script>