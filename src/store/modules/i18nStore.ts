import { defineStore } from 'pinia'

// 定义语言类型
export type Language = 'en' | 'zh' | 'zh-TW';

// 定义状态接口
interface I18nState {
  currentLang: Language;
}

export const useI18nStore = defineStore('i18n', {
  state: (): I18nState => ({
    currentLang: (localStorage.getItem('lang') as Language) || 'en',
  }),
  
  actions: {
    // 修改 setLanguage 方法，不再直接调用 useI18n
    setLanguage(lang: Language) {
      // 仅更新 store 中的状态和 localStorage
      this.currentLang = lang;
      localStorage.setItem('lang', lang);
    },
    
    initLanguage() {
      const savedLang = localStorage.getItem('lang') as Language | null;
      if (savedLang && ['en', 'zh', 'zh-TW'].includes(savedLang)) {
        this.currentLang = savedLang;
      } else {
        // 浏览器默认语言
        const browserLang = navigator.language;
        if (browserLang.startsWith('zh')) {
          // 检测是否为台湾/香港地区
          if (browserLang === 'zh-TW' || browserLang === 'zh-HK') {
            this.currentLang = 'zh-TW';
          } else {
            this.currentLang = 'zh';
          }
        } else {
          this.currentLang = 'en';
        }
      }
      // 返回当前语言，以便在 main.ts 中使用
      return this.currentLang;
    }
  },
  
  getters: {
    getAppLanguage: (state): Language => state.currentLang,
  }
})