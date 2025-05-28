// filepath: portfolio-vue3-vite/src/components/layout/AppHeader.vue
<template>
  <header class="app-header">
    <nav>
      <router-link to="/">{{ t('navigation.home') }}</router-link>
      <router-link to="/portfolio">{{ t('navigation.portfolio') }}</router-link>
      <router-link to="/about">{{ t('navigation.about') }}</router-link>
      <router-link to="/contact">{{ t('navigation.contact') }}</router-link>
    </nav>
    <LanguageSwitcher /> <!-- 添加语言切换组件 -->
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'; // 稍后创建

const { t } = useI18n();
</script>

<style scoped>
.app-header {
  background-color: var(--secondary-color);
  padding: 1rem;
  color: black;
  display: flex; /* 用于对齐导航和切换器 */
  justify-content: space-between; /* 用于对齐导航和切换器 */
  align-items: center; /* 用于对齐导航和切换器 */
}
nav a {
  color: black;
  margin-right: 1rem;
  font-weight: bold;
}
nav a.router-link-exact-active {
  color: var(--primary-color);
  text-decoration: underline;
}
</style>