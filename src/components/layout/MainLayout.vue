<template>
  <div class="layout-container" :class="{ 'no-scroll': isHomePage }">
    <div class="top-visual-bar"></div>
    <AppHeader class="fixed-header" />
    <main class="main-content" :class="{ 'is-home': isHomePage }">
      <router-view />
    </main>
    <AppFooter class="fixed-footer" />
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const isHomePage = computed(() => route.name === 'Home');
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Use min-height to be more flexible
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
  top: 5px;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  padding-top: calc(5px + 60px); // Use padding instead of margin
  padding-bottom: 60px;
  flex: 1;
  display: flex; // Ensure it's a flex container
  flex-direction: column; // Stack children vertically
}

// We only apply overflow to non-home pages to allow scrolling
.main-content:not(.is-home) {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
</style>