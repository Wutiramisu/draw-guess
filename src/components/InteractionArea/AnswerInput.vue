<template>
  <div class="flex items-stretch">
    <input
      type="text"
      class="px-2 py-1.5 rounded-l flex-1 text-lg"
      placeholder="請輸入答案"
      v-model.trim="text"
      @keyup.enter="sendAnswer"
    />
    <button class="bg-green-500 text-white px-4 rounded-r" @click="sendAnswer">確定</button>
  </div>
</template>

<script setup>
import { ref, defineEmit } from 'vue';

const emit = defineEmit(['sendAnswer']);

const text = ref('');

const sendAnswer = () => {
  if (text.value === '') return;
  emit('sendAnswer', text.value);
  text.value = '';
};
</script>

<style lang="scss" scoped></style>
