import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const repoName = 'portfolio-vue3-vite'

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:color";
          @use "@/assets/styles/variables.scss" as *; // 使用 @use 并通过 as * 使其成员全局可用
        `
      }
    }
  }
})
