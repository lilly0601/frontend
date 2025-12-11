<template>
  <div class="flex items-center border-b py-2">
    <img :src="item.image" class="w-12 h-12 object-cover mr-2"/>
    <div class="flex-1">
      <h4 class="font-semibold">{{ item.title }}</h4>
      <p class="text-gray-500">{{ item.price }} KZT</p>
    </div>
    <MyButton @click="$emit('remove', item.url)" classes="bg-red-500 hover:bg-red-600 px-2 py-1">
      Удалить
    </MyButton>
  </div>
</template>

<script>
import MyButton from './MyButton.vue';

export default {
  props: { item: Object },
  components: { MyButton }
}
</script>