<template>
  <div class="card">
    <img :src="product.img" width="50" />
    <div>
      <strong>{{ product.title }}</strong>
      <div>{{ product.brand }}</div>
      <div>{{ product.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product']
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