// filepath: portfolio-vue3-vite/src/components/common/AnimatedHeadline.vue
<template>
  <h1 class="animated-headline">
    {{ text }}
  </h1>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
});
// 你可以在这里添加动画逻辑，或使用 CSS 动画
</script>

<style scoped>
.animated-headline {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-color);
  /* 添加动画效果 */
  animation: fadeInScale 1s ease-out forwards;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>