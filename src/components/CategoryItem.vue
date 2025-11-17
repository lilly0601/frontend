<template>
  <div
    class="cursor-pointer p-2 hover:bg-gray-200 rounded"
    @click="$emit('select', category)"
  >
    {{ category }} ({{ count }})
  </div>
</template>

<script>
export default {
  props: {
    category: String,
    count: Number
  }
}
</script>