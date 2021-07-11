<template>
  <div class="bg-yellow-100 flex justify-center items-center">
    <!-- 玩家不足 -->
    <div v-if="noUser" class="flex flex-col justify-center items-center">
      <div class="text-blue-500 text-3xl font-bold">等待玩家...</div>
    </div>

    <!-- 繼續下一場 -->
    <Screen v-else-if="!isAllNextGame" @button-click="nextGame" :toggle="nextGameChecked">
      <template #title>遊戲結束</template>
      <template #button-desc>繼續遊戲</template>
    </Screen>

    <div v-else>
      <!-- 畫家 -->
      <Screen v-if="identity === 'painter'" @button-click="onReady" :toggle="isReady">
        <template #topic>{{ props.topic }}</template>
        <template #title>輪到你畫!</template>
        <template #button-desc>準備完成</template>
      </Screen>

      <!-- 猜題者 -->
      <Screen v-if="identity === 'guesser'" @button-click="onReady" :toggle="isReady">
        <template #title>輪到你猜!</template>
        <template #button-desc>準備完成</template>
      </Screen>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmit, onMounted } from 'vue';
import { useStore } from 'vuex';
import Screen from './Screen.vue';

const props = defineProps({
  topic: String,
});

const store = useStore();
const socket = store.getters.socket;

const noUser = ref(true);
const identity = ref(undefined);

const isAllNextGame = ref(true);
const nextGameChecked = ref(false);
const nextGame = () => {
  nextGameChecked.value = true;
  socket.emit('next game');
};

const isReady = ref(false);
const onReady = () => {
  isReady.value = true;
  socket.emit('ready');
};

const resetStatus = () => {
  isReady.value = false;
  isAllNextGame.value = false;
  nextGameChecked.value = false;

  identity.value = undefined;
};

const socketReceiver = () => {
  socket.on('to ready step', (userInfo) => {
    noUser.value = false;

    identity.value = userInfo[socket.id].identity;
  });

  socket.on('all next game', () => {
    isAllNextGame.value = true;
  });

  socket.on('game timeout', () => {
    resetStatus();
  });
};

onMounted(() => {
  socketReceiver();
});
</script>
