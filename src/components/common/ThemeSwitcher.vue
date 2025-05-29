<template>
  <div class="theme-switcher">
    <div class="theme-label">{{ t('portfolio.theme_switcher.label') }}:</div>
    <div class="theme-buttons">
      <button 
        class="theme-button" 
        :class="{ active: uiStore.theme === 'theme-light' }"
        @click="uiStore.setTheme('theme-light')"
        :title="t('portfolio.theme_switcher.light_title')"
      >
        {{ t('portfolio.theme_switcher.light') }}
      </button>
      <button 
        class="theme-button" 
        :class="{ active: uiStore.theme === 'theme-dark' }"
        @click="uiStore.setTheme('theme-dark')"
        :title="t('portfolio.theme_switcher.dark_title')"
      >
        {{ t('portfolio.theme_switcher.dark') }}
      </button>
      <button 
        class="theme-button" 
        :class="{ active: uiStore.theme === 'theme-warm' }"
        @click="uiStore.setTheme('theme-warm')"
        :title="t('portfolio.theme_switcher.warm_title')"
      >
        {{ t('portfolio.theme_switcher.warm') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUiStore } from '@/store/modules/uiStore';

const { t } = useI18n();
const uiStore = useUiStore();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.theme-switcher {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: $border-radius-md;
  background-color: var(--chat-messages-bg, $light-grey); // Use a theme variable or fallback
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  justify-content: center;
  flex-wrap: wrap;
}

.theme-label {
  font-size: 0.9rem;
  color: var(--chat-text-color, $text-color); // Use a theme variable or fallback
  margin-right: 0.5rem;
}

.theme-buttons {
  display: flex;
  gap: 0.5rem;
}

.theme-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--chat-title-border, $grey-light); // Use a theme variable or fallback
  background-color: var(--chat-input-bg, $white); // Use a theme variable or fallback
  color: var(--chat-text-color, $text-color); // Use a theme variable or fallback
  border-radius: $border-radius-sm;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;

  &:hover {
    filter: brightness(95%);
    transform: translateY(-1px);
  }

  &.active {
    background-color: var(--chat-accent-color, $primary-color); // Use a theme variable or fallback
    color: var(--chat-button-text-color, $white); // Use a theme variable or fallback
    border-color: var(--chat-accent-color, $primary-color); // Use a theme variable or fallback
    font-weight: bold;
  }
}
</style>