import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isDarkMode: false,
    isLoading: false,
  }),
  getters: {
    currentTheme: (state) => (state.isDarkMode ? 'dark' : 'light'),
  },
  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      // 你可能还需要在这里操作 document.body.classList 来切换实际的 CSS 主题
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.remove('light-theme');
      } else {
        document.documentElement.classList.add('light-theme');
        document.documentElement.classList.remove('dark-theme');
      }
    },
    setLoading(status) {
      this.isLoading = status;
    },
  },
})