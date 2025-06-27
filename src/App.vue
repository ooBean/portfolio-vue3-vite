<script setup lang="ts">
import { watch } from 'vue';
import { useUiStore } from '@/store/modules/uiStore';

const uiStore = useUiStore();

watch(
  () => uiStore.theme,
  (newTheme) => {
    const themes = ['theme-light', 'theme-dark', 'theme-warm'];
    document.body.classList.remove(...themes);
    if (themes.includes(newTheme)) {
      document.body.classList.add(newTheme);
    }
  },
  { immediate: true }
);
</script>

<template>
  <router-view />
</template>

<style lang="scss">
/* 简单的页面过渡效果示例 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 你可以定义更多过渡效果，并在路由元信息中指定 */
$slide-transition-duration: 0.3s;
$slide-timing-function: cubic-bezier(0.55, 0, 0.1, 1);

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all $slide-transition-duration $slide-timing-function;
}

.slide-left-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to,
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
