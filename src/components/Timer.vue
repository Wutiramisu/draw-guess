<template>
  <div class="bg-transparent border-4 border-red-600 rounded-full w-14 h-14 relative">
    <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">{{ second }}</span>
  </div>
</template>

<script setup>
import { ref, toRef, watch, defineProps, defineEmit, onUnmounted } from 'vue';

const props = defineProps({
  time: Number,
  start: Boolean,
});

const emit = defineEmit(['timeout']);

const isStarted = toRef(props, 'start');
watch(isStarted, (newValue) => {
  if (newValue) timing(); // 遊戲開始，啟動計時器
});

const second = ref(props.time);
let timer;
const timing = () => {
  second.value = props.time; // 秒數重置
  timer = setInterval(() => {
    second.value === 0 ? timeout(timer) : second.value--;
  }, 1000);
};

const timeout = (timer) => {
  clearInterval(timer);
  emit('timeout');
};

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped></style>
