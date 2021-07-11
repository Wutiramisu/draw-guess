<template>
  <div class="py-4 px-3 mx-auto bg-gray-200 rounded-t-3xl select-none">
    <div class="flex justify-center items-center relative">
      <!-- 標題 -->
      <div class="rounded-full border-4 border-blue-200 bg-blue-500 text-2xl text-white px-4 py-2">
        <span v-if="identity">{{ title }}</span>
        <span v-else>等待中</span>
      </div>
      <!-- 計時器 -->
      <Timer class="absolute right-0" :start="isStarted" :time="30" @timeout="timeout" />
    </div>

    <div
      class="overflow-hidden border-blue-200 border-2 mx-auto my-4 relative"
      :style="{ width: area.width + 'px', height: area.height + 'px' }"
    >
      <!-- 繪畫區 -->
      <DoodlePad :area="area" :drawable="isDrawable" />

      <!-- 布幕 -->
      <transition>
        <Curtain
          v-show="!isStarted"
          class="absolute bottom-0 left-0"
          :style="{ width: area.width + 'px', height: area.height * 1.05 + 'px' }"
          :topic="topic"
          @all-ready="start"
        />
      </transition>
    </div>

    <InteractionArea class="w-full" :isPainter="isPainter" :isStarted="isStarted" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

import DoodlePad from '@/components/DoodlePad/DoodlePad.vue';
import Curtain from '@/components/Curtain/Curtain.vue';
import Timer from '@/components/Timer.vue';
import InteractionArea from '@/components/InteractionArea/InteractionArea.vue';

const store = useStore();
const socket = store.getters.socket;

const area = {
  width: 1000,
  height: 500,
};

const identity = ref(undefined);
const identityEnum = {
  painter: '輪到你畫',
  guesser: '輪到你猜',
};

const isStarted = ref(false);
const isDrawable = ref(false);
const isPainter = ref(false);
const topic = ref(undefined); // 題目
const title = ref(undefined); // 顯示的標題
const start = () => {
  isStarted.value = true;

  /* 等待布幕往上到相對位置才更換標題，時間參數需參考動畫秒數 */
  if (identity.value === 'painter') {
    isDrawable.value = true;

    setTimeout(() => {
      title.value = `題目: ${topic.value}`;
    }, 900);
  }
};

const timeout = () => {
  socket.emit('game timeout');
  isDrawable.value = false;
  isStarted.value = false;
};

const socketReceiver = () => {
  socket.on('to ready step', (userInfo, subject) => {
    topic.value = subject;

    identity.value = userInfo[socket.id].identity;
    identity.value === 'painter' ? (isPainter.value = true) : (isPainter.value = false);
    title.value = identityEnum[identity.value];
  });

  socket.on('all ready', () => {
    start();
  });
};

onMounted(() => {
  socketReceiver();

  socket.emit('join server', store.getters.name);
});

onBeforeUnmount(() => {
  socket.emit('leave server', store.getters.name);
});
</script>

<style lang="scss" scoped>
.v-leave-active {
  animation: reveal-curtain 2s;
}

@keyframes reveal-curtain {
  0% {
    bottom: 0;
  }

  20% {
    bottom: -5%;
  }

  100% {
    bottom: 105%;
  }
}
</style>
