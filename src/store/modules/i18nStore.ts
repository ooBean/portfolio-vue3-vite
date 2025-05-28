// filepath: portfolio-vue3-vite/src/store/modules/uiStore.ts (或 i18nStore.ts)
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n' // 导入 useI18n

export const useUiStore = defineStore('ui', { // 如果是新 store，可以叫 'i18n'
  state: () => ({
    // ... other ui states
    currentLang: localStorage.getItem('lang') || 'en',
  }),
  actions: {
    // ... other actions
    setLanguage(lang: string) { // 为 lang 参数指定 string 类型
      const { locale } = useI18n(); // 在 action 内部获取 i18n 实例
      if (locale && lang && locale.value !== lang) {
        locale.value = lang;
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        // 可能需要强制刷新或采取其他措施确保所有组件都更新，
        // 但通常 vue-i18n 的 locale 变化会触发响应式更新。
      } else if (locale && !lang) { // 如果 lang 为空，则使用 i18n 当前的 locale
        this.currentLang = locale.value;
        localStorage.setItem('lang', locale.value);
      }
    }
  },
  getters: {
    // ... other getters
    getAppLanguage: (state) => state.currentLang,
  }
})