// filepath: portfolio-vue3-vite/src/components/layout/MainLayout.vue
<template>
  <div class="layout-container">
    <div class="top-visual-bar"></div>
    <AppHeader class="fixed-header" />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter class="fixed-footer" />
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.top-visual-bar {
  height: 5px;
  background-color: $site-top-border-color;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
}

.fixed-header {
  position: fixed;
  top: 5px; /* 顶部视觉条的高度 */
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  margin-top: calc(5px + 60px); /* 顶部栏 + 头部高度，根据实际调整 */
  margin-bottom: 60px; /* 底部高度，根据实际调整 */
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
</style>