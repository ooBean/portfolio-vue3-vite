import { defineStore } from 'pinia'
import type { Theme } from '@/types/unsplash';

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
      document.body.classList.remove('theme-light', 'theme-dark', 'theme-warm');
      document.body.classList.add(newTheme);
      this.theme = newTheme;
      localStorage.setItem('theme', newTheme);
    },

    toggleDarkMode() {
      this.setTheme(this.theme === 'theme-dark' ? 'theme-light' : 'theme-dark');
    },

    setLoading(status: boolean) {
      this.isLoading = status;
    },

    initTheme() {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme && ['theme-light', 'theme-dark', 'theme-warm'].includes(savedTheme)) {
        this.setTheme(savedTheme);
      } else {
        this.setTheme('theme-light');
      }
    }
  },
})