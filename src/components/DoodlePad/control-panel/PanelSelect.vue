<template>
  <div class="whitespace-nowrap px-2 mx-1">
    <span>Size</span>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', Number($event.target.value))"
      class="focus:outline-none cursor-pointer pl-2 bg-gray-100"
    >
      <option value="2">2</option>
      <option value="6">6</option>
      <option value="10">10</option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmit } from 'vue';

const props = defineProps({
  modelValue: Number,
});

const emit = defineEmit(['update:modelValue']);
</script>

<style lang="scss" scoped></style>
