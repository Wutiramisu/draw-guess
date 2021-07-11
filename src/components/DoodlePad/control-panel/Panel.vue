<template>
  <div class="w-auto">
    <div
      class="bg-gray-100 rounded-full shadow-sm flex transition-all duration-500 overflow-hidden"
      :class="{ 'w-12': !isExpand, 'w-full': isExpand }"
    >
      <button class="flex items-center bg-gray-100 rounded-full p-3" @click="expandPanel">
        <span class="material-icons transform transition-transform duration-500" :class="{ 'icon-flip': isExpand }">
          arrow_forward_ios
        </span>
      </button>

      <div class="flex items-center">
        <PanelButton icon="bi bi-pencil-fill" @click="onPencil" />
        <PanelButton icon="bi bi-eraser-fill" @click="onEraser" />
        <PanelSelect v-model="lineWidth" />
        <PanelButton icon="bi bi-trash-fill" @click="clearAll" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmit, onMounted, nextTick } from 'vue';
import PanelButton from './PanelButton.vue';
import PanelSelect from './PanelSelect.vue';

const props = defineProps({
  modelValue: Number,
});
const emit = defineEmit(['onPencil', 'onEraser', 'clearAll', 'changeWidth']);

/* toggle panel */
const isExpand = ref(true);
const expandPanel = () => {
  isExpand.value = !isExpand.value;
};

const lineWidth = ref(2);
watch(lineWidth, (newValue) => {
  emit('changeWidth', newValue);
});

const onPencil = () => emit('onPencil');
const onEraser = () => emit('onEraser');
const clearAll = () => emit('clearAll');
</script>

<style lang="scss" scoped>
.icon-flip {
  transform: scaleX(-1);
}
</style>
