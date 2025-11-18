<template>
  <button class="category-btn" @click="$emit('click')">{{ category }}</button>
</template>

<script>
export default {
  props: ['category']
};
</script>

<style>
.category-btn {
  padding: 5px 10px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.category-btn:hover {
  background-color: #3730a3;
}
</style>