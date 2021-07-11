<template>
  <div class="relative w-fit">
    <Panel
      v-show="props.drawable"
      class="absolute top-4 left-4"
      @onEraser="onEraser"
      @onPencil="onPencil"
      @clearAll="clearAll"
      @changeWidth="changeWidth"
    />

    <canvas
      ref="canvas"
      class="canvas rounded"
      @mousedown="onMousedown"
      @mousemove="onMousemove"
      @mouseup="onMouseup"
      @mouseleave="onMouseleave"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import Panel from './control-panel/Panel.vue';

const props = defineProps({
  drawable: Boolean,
  area: Object,
});

const store = useStore();

/* socket listener */
const socket = store.getters.socket;
const socketReceiver = () => {
  socket.on('beforeSketching', (posX, posY) => {
    ctx.beginPath();
    ctx.moveTo(posX, posY);
  });

  socket.on('sketching', (posX, posY) => {
    ctx.lineTo(posX, posY);
    ctx.stroke();
  });

  socket.on('pencilMode', () => {
    onPencil();
  });

  socket.on('eraserMode', () => {
    onEraser();
  });

  socket.on('changeLineWidth', (width) => {
    ctx.lineWidth = width;
  });

  socket.on('clearAll', () => {
    ctx.clearRect(0, 0, canvas.value.clientWidth, canvas.value.clientHeight);
  });
};

/* canvas setting */
const canvas = ref(null);
let ctx = null;

// const bgColor = '#E5E5E5';
const bgColor = '#FFF';
const pencilColor = '#01936F';
const eraserColor = bgColor;

/* canvas initialize */
const setCanvas = () => {
  canvas.value.width = props.area.width;
  canvas.value.height = props.area.height;

  ctx = canvas.value.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = pencilColor;
  ctx.lineWidth = 2;
};

/* mouse event */
let isDrawing = false;
const onMousedown = (e) => {
  if (!props.drawable) return;
  isDrawing = true;

  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);

  socket.emit('startPoint', e.offsetX, e.offsetY);
};

const onMousemove = (e) => {
  if (!isDrawing || !props.drawable) return;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  socket.emit('drawing', e.offsetX, e.offsetY);
};

const onMouseup = () => {
  isDrawing = false;
};

const onMouseleave = () => {
  isDrawing = false;
};

/* function button */
const onPencil = () => {
  ctx.strokeStyle = pencilColor;
  socket.emit('pencilMode');
};

const onEraser = () => {
  ctx.strokeStyle = eraserColor;
  socket.emit('eraserMode');
};

const changeWidth = (width) => {
  ctx.lineWidth = width;

  socket.emit('changeLineWidth', width);
};

const clearAll = () => {
  ctx.clearRect(0, 0, canvas.value.clientWidth, canvas.value.clientHeight);

  socket.emit('clearAll');
};

/* lifecycle */
onMounted(() => {
  setCanvas();
  socketReceiver();
});

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>

<style lang="scss" scoped>
.canvas {
  background-color: v-bind(bgColor);
}
</style>
