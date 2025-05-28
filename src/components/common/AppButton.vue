// filepath: portfolio-vue3-vite/src/components/common/AppButton.vue
<template>
  <button class="app-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.app-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.app-button:hover {
  background-color: #36a874; /* 略深的 Vue Green */
}
</style>