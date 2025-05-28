// filepath: portfolio-vue3-vite/src/components/common/LoadingSpinner.vue
<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
// No script needed for a simple CSS spinner
</script>

<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  /* You can adjust height декоративно or let parent control it */
  /* height: 100px; */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: var(--primary-color, #42b883); /* Use primary color or a fallback */
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>