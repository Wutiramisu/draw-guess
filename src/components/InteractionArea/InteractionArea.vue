<template>
  <div class="bg-gray-200">
    <ul class="bg-white overflow-y-scroll h-[200px]" ref="board">
      <BroadcastMsg v-for="(msg, i) in message" :key="i" :data="msg" :index="i" />
    </ul>

    <AnswerInput class="mt-1" @sendAnswer="sendAnswer" v-if="!props.isPainter && props.isStarted" />
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, onUpdated } from 'vue';
import BroadcastMsg from './BroadcastMsg.vue';
import AnswerInput from './AnswerInput.vue';
import { useStore } from 'vuex';

const props = defineProps({
  isPainter: Boolean,
  isStarted: Boolean,
});

const message = ref([]);

const store = useStore();
const socket = store.getters.socket;

const socketReceiver = () => {
  socket.on('user join', (data) => {
    message.value.push(data);
  });

  socket.on('user leave', (data) => {
    message.value.push(data);
  });

  socket.on('answering result', (data) => {
    message.value.push(data);
  });
};

const board = ref(null);

const sendAnswer = (data) => {
  socket.emit('answer', data);
};

onMounted(() => {
  socketReceiver();
});

onUpdated(() => {
  // auto scroll to bottom
  board.value.scrollTop = board.value.scrollHeight;
});
</script>

<style lang="scss" scoped></style>
