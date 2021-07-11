<template>
  <button class="whitespace-nowrap px-2 mx-1">
    <i class="text-2xl" :class="props.icon"></i>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  icon: String,
});
</script>

<style lang="scss" scoped></style>
