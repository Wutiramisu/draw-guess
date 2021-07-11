<template>
  <div class="border flex flex-col justify-center items-center w-fit mx-auto mt-10 p-5 rounded-xl bg-white">
    <form @submit.prevent="login" class="flex items-stretch">
      <div class="bg-gray-200 text-gray-600 px-4 rounded-l flex items-center">名稱</div>
      <input
        v-model.trim="name"
        type="text"
        class="px-3 py-1.5 rounded-r flex-1 text-md border"
        placeholder="最多8個字"
        maxlength="8"
      />
    </form>

    <button class="mt-4 px-4 py-2 rounded bg-green-500 text-white" @click="login">進入遊戲</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const name = ref(undefined);

const login = () => {
  if (name.value === '') return;
  store.dispatch('login', name.value);
  store.dispatch('socketConnect');
  router.push('/');
};
</script>

<style lang="scss" scoped></style>
