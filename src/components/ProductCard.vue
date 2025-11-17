<template>
  <div class="border rounded p-4 shadow flex flex-col items-center">
    <img :src="product.image" class="w-32 h-32 object-cover mb-2"/>
    <h3 class="font-bold text-lg mb-1">{{ product.title }}</h3>
    <p class="text-gray-500 mb-2">{{ product.price }} KZT</p>
    <MyButton @click="addToWishlist">Добавить в вишлист</MyButton>
  </div>
</template>

<script>
import MyButton from './MyButton.vue';
import { useWishlistStore } from '../store/wishlist.js';

export default {
  props: {
    product: Object
  },
  components: { MyButton },
  setup(props) {
    const store = useWishlistStore();
    const addToWishlist = () => {
      store.addProduct(props.product);
    };
    return { addToWishlist };
  }
}
</script>