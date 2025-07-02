<template>
  <div class="theme-background" :style="backgroundStyle"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUiStore } from '@/store/modules/uiStore';
import type { Theme } from '@/types/unsplash';

const uiStore = useUiStore();

const themeBackgroundMap: Record<Theme, string> = {
  'theme-light': 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/blue.avif',
  'theme-dark': 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/dark.avif',
  'theme-warm': 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/warm.avif',
};

const currentTheme = computed(() => uiStore.theme);

const backgroundStyle = computed(() => {
  const url = themeBackgroundMap[currentTheme.value] || themeBackgroundMap['theme-light'];
  return {
    background: `url(${url}) no-repeat center center / cover`,
    filter: 'blur(80px)',
    transform: 'scale(1.2)',
    position: 'fixed' as const,
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '0'
  };
});
</script>

<style scoped lang="scss">
.theme-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}
</style>
