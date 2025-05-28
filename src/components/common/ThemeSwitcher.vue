<template>
  <div class="theme-switcher">
    <span class="switcher-label">{{ t('portfolio.theme_switcher.label') }}:</span>
    <button
      v-for="theme in themes"
      :key="theme.name"
      @click="selectTheme(theme.className)"
      :class="['theme-button', { active: currentTheme === theme.className }]"
      :title="t(theme.titleKey)"
    >
      {{ t(theme.nameKey) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface ThemeOption {
  name: string;
  nameKey: string;
  className: string;
  titleKey: string;
}

const props = defineProps<{
  currentTheme: string;
}>();

const emit = defineEmits<{
  (e: 'theme-change', themeClassName: string): void;
}>();

const themes = ref<ThemeOption[]>([
  { name: 'Light', nameKey: 'portfolio.theme_switcher.light', className: 'theme-light', titleKey: 'portfolio.theme_switcher.light_title' },
  { name: 'Dark', nameKey: 'portfolio.theme_switcher.dark', className: 'theme-dark', titleKey: 'portfolio.theme_switcher.dark_title' },
  { name: 'Warm', nameKey: 'portfolio.theme_switcher.warm', className: 'theme-warm', titleKey: 'portfolio.theme_switcher.warm_title' },
]);

const selectTheme = (themeClassName: string) => {
  emit('theme-change', themeClassName);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

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

.switcher-label {
  font-size: 0.9rem;
  color: var(--chat-text-color, $text-color); // Use a theme variable or fallback
  margin-right: 0.5rem;
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