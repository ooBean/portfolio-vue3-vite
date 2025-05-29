import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n' // 导入 createI18n

import App from './App.vue'
import router from './router'

// 引入全局样式
import './assets/styles/base.scss';
import '@/style.scss';

// 导入语言文件
import enMessages from './locales/en.json'
import zhMessages from './locales/zh.json'
import zhTWMessages from './locales/zh-TW.json' // 导入繁体中文语言文件

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 必须设置为 false，才能在 Composition API 中使用
  locale: localStorage.getItem('lang') || 'en', // 默认语言，尝试从 localStorage 获取
  fallbackLocale: 'en', // 如果当前语言缺少翻译，则回退到英语
  messages: {
    en: enMessages,
    zh: zhMessages,
    'zh-TW': zhTWMessages // 添加繁体中文配置
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n) // 使用 i18n 插件

app.mount('#app')
