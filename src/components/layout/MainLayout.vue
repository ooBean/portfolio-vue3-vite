// filepath: portfolio-vue3-vite/src/components/layout/MainLayout.vue
<template>
  <div class="top-visual-bar"></div>
  <AppHeader />
  <main class="main-content">
    <slot></slot>
  </main>
  <AppFooter />
</template>

<script setup>
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
</script>

<style scoped lang="scss">
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  padding: 1rem; /* 示例内边距 */
  /* max-width: 1200px; */ /* 可选: 内容最大宽度 */
  /* margin: 0 auto; */   /* 可选: 内容居中 */
}
.top-visual-bar {
  height: 5px;
  background-color: $site-top-border-color; // 使用你的 SCSS 变量
  width: 100%;
}
</style>