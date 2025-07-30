import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import { useUiStore } from './store/modules/uiStore'
import { useI18nStore } from './store/modules/i18nStore'

// 引入全局样式
import './assets/styles/base.scss';
import '@/style.scss';

// 导入语言文件
import enMessages from './locales/en.json'
import zhMessages from './locales/zh.json'
import zhTWMessages from './locales/zh-TW.json'

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: {
    en: enMessages,
    zh: zhMessages,
    'zh-TW': zhTWMessages
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

// 导入并注册自定义指令
import focusDirective from '@/directives/focus';
app.directive('focus', focusDirective);

// 初始化store
const uiStore = useUiStore()
uiStore.initTheme()

const i18nStore = useI18nStore();
const currentLang = i18nStore.initLanguage();
i18n.global.locale.value = currentLang;

app.mount('#app')
