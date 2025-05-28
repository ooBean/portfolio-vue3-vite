import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n' // 导入 createI18n

import App from './App.vue'
import router from './router'

// 引入全局样式
import './assets/styles/base.scss'; // Or your main SCSS file that includes base.scss
// import '@/assets/styles/animations.css' // 如果有，也需要改为 .scss
// import '@/assets/styles/responsive.css' // 如果有，也需要改为 .scss
import '@/style.scss'; // 导入新的全局 SCSS 文件

// 导入语言文件
import enMessages from './locales/en.json'
import zhMessages from './locales/zh.json'

// Pinia store (如果需要用 Pinia 管理语言状态)
// import { useUiStore } from '@/store/modules/uiStore'; // 假设 uiStore 用于管理语言

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 必须设置为 false，才能在 Composition API 中使用
  locale: localStorage.getItem('lang') || 'en', // 默认语言，尝试从 localStorage 获取
  fallbackLocale: 'en', // 如果当前语言缺少翻译，则回退到英语
  messages: {
    en: enMessages,
    zh: zhMessages
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n) // 使用 i18n 插件

// 如果使用 Pinia 管理语言状态，可以在这里初始化
// const pinia = createPinia();
// app.use(pinia);
// const uiStore = useUiStore(); // 确保 Pinia 实例已创建
// if (uiStore.currentLang) { // 假设 uiStore 中有 currentLang
//   i18n.global.locale.value = uiStore.currentLang;
// }


app.mount('#app')
