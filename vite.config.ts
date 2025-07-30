import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const isVercel = process.env.VERCEL === '1' // Vercel 环境变量
console.log(process.env,'process.env')  
console.log(isVercel,'isVercel')
export default defineConfig({
  base: isGitHubPages
    ? '/portfolio-vue3-vite/'
    : isVercel
      ? '/'  // Vercel 部署时使用根路径
      : './',
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
  },
  server: {
    open: true
  }
})
