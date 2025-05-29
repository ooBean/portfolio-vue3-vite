// filepath: portfolio-vue3-vite/src/components/layout/AppFooter.vue
<template>
  <footer class="app-footer">
    <p>{{ t('footer.copyright', { year: new Date().getFullYear(), name: userName }) }}</p>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';
const { t } = useI18n();
const userName = computed(() => t('home.user_name_placeholder'));
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.app-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  height: 60px; /* 固定高度 */
  box-sizing: border-box;
}
</style>