<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-blue-500 text-3xl font-bold">
      <slot name="title"></slot>
    </div>
    <div v-if="showTopic" class="base bg-blue-500 border-4 border-blue-200 mt-8">題目: <slot name="topic"></slot></div>

    <button
      class="base bg-white mt-8 shadow-md transform border-4 border-green-500"
      :class="{ 'active:scale-95': !toggle, 'active:shadow-none': !toggle, '': toggle }"
      :disabled="toggle"
      @click="onClick"
    >
      <span :class="{ 'text-gray-300': !toggle, 'text-green-500': toggle }">
        <slot name="button-desc"></slot>
      </span>
      <i class="bi bi-check-lg ml-3 text-green-500" v-if="toggle"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmit, useContext } from 'vue';

const porps = defineProps({
  toggle: Boolean,
});

const emit = defineEmit(['button-click']);
const onClick = () => {
  emit('button-click');
};

const ctx = useContext();
const showTopic = ref(ctx.slots.topic);
</script>

<style lang="scss" scoped>
.base {
  @apply rounded-full  text-2xl text-white px-4 py-2;
}
</style>
