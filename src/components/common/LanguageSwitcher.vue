<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="changeLanguage">
      <option v-for="locale in availableLocales" :key="`locale-${locale}`" :value="locale">
        {{ getLanguageLabel(locale) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useI18nStore } from '@/store/modules/i18nStore';

type Language = 'en' | 'zh' | 'zh-TW';

const { locale, availableLocales } = useI18n();
const i18nStore = useI18nStore();
const currentLocale = ref(locale.value);

const changeLanguage = () => {
  i18nStore.setLanguage(currentLocale.value as Language);
};

// 获取语言显示名称
const getLanguageLabel = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'English';
    case 'zh':
      return '简体中文';
    case 'zh-TW':
      return '繁體中文';
    default:
      return locale;
  }
};

// 监听 i18n locale 的变化
watch(locale, (newLocale) => {
  currentLocale.value = newLocale;
});
</script>

<style scoped>
.language-switcher select {
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  cursor: pointer;
}
.language-switcher select:focus {
  outline: none;
  border-color: var(--primary-color);
}
</style>