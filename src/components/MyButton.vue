<template>
  <button
    :class="classes"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
    }
  }
}
</script>