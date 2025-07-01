import { defineStore } from 'pinia'
import type { Theme } from '@/types/unsplash';

// 定义主题类型

// 定义状态接口
interface UiState {
  theme: Theme;
  isLoading: boolean;
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    theme: (localStorage.getItem('theme') as Theme) || 'theme-light',
    isLoading: false,
  }),
  
  getters: {
    currentTheme: (state): Theme => state.theme,
    isDarkMode: (state): boolean => state.theme === 'theme-dark',
  },
  
  actions: {
    setTheme(newTheme: Theme) {
      // 移除所有主题类
      document.body.classList.remove('theme-light', 'theme-dark', 'theme-warm');
      // 添加新主题类
      document.body.classList.add(newTheme);
      // 更新状态
      this.theme = newTheme;
      // 保存到本地存储
      localStorage.setItem('theme', newTheme);
    },
    
    toggleDarkMode() {
      this.setTheme(this.theme === 'theme-dark' ? 'theme-light' : 'theme-dark');
    },
    
    setLoading(status: boolean) {
      this.isLoading = status;
    },
    
    // 初始化主题
    initTheme() {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme && ['theme-light', 'theme-dark', 'theme-warm'].includes(savedTheme)) {
        this.setTheme(savedTheme);
      } else {
        // 默认主题
        this.setTheme('theme-light');
      }
    }
  },
})