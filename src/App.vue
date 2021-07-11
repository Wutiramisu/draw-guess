<template>
  <div class="bg-image py-2 h-[100vh]">
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bg-image {
  background: linear-gradient(
      135deg,
      #f5f5f8 22px,
      rgba($main, 0.12) 0,
      rgba($main, 0.12) 24px,
      transparent 0,
      transparent 67px,
      rgba($main, 0.12) 0,
      rgba($main, 0.12) 69px,
      transparent 0
    ),
    linear-gradient(
        225deg,
        #f5f5f8 22px,
        rgba($main, 0.12) 0,
        rgba($main, 0.12) 24px,
        transparent 0,
        transparent 67px,
        rgba($main, 0.12) 0,
        rgba($main, 0.12) 69px,
        transparent 0
      )
      0 64px;
  background-color: #f5f5f8;
  background-size: 64px 128px;
  margin-top: 0 !important;
}
</style>
