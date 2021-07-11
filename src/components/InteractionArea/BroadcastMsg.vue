<template>
  <!-- 遊戲訊息 -->
  <li
    v-if="props.data.type === 'game'"
    class="px-2 py-1 flex items-center"
    :class="{
      'bg-green-50': props.data.status,
      'bg-red-50': !props.data.status,
      'text-green-500': props.data.status,
      'text-red-500': !props.data.status,
    }"
  >
    <span class="text-gray-400 text-xs">[遊戲]</span>
    <span class="mx-1 text-black">{{ props.data.user }}</span>
    <span v-if="props.data.status">答對了</span>
    <span v-else>答錯了</span>
  </li>

  <!-- 系統訊息 -->
  <li v-if="props.data.type === 'system'" class="px-2 py-1 flex items-center text-gray-400">
    <span class="text-gray-400 text-xs">[系統]</span>
    <span class="mx-1 text-black">{{ props.data.user }}</span>
    <span>{{ props.data.msg }}</span>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  data: Object,
  index: Number,
});
</script>

<style lang="scss" scoped></style>
