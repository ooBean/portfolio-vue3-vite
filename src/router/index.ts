import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router' // 导入 RouteRecordRaw 类型
import HomeView from '@/views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [ // 为 routes 数组指定类型
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { transition: 'fade' } // 示例: 页面过渡动画名称
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'), // 路由懒加载
    meta: { transition: 'slide-left' }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('@/views/portfolio/index.vue'),
    meta: { transition: 'slide-right' }
  },
  {
    path: '/portfolio/todoListView',
    name: 'TodoListView',
    component: () => import('@/views/portfolio/TodoListView.vue'),
    meta: { transition: 'slide-right' }
  },
  {
  path: '/portfolio/chatView',
  name: 'ChatView',
  component: () => import('@/views/portfolio/ChatView.vue'),
  meta: { transition: 'slide-right' }
},
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { transition: 'fade' }
  },
  // 你可以为 DemoDetailView.vue 添加动态路由
  // {
  //   path: '/portfolio/:demoName',
  //   name: 'DemoDetail',
  //   component: () => import('@/views/DemoDetailView.vue'),
  //   props: true
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 Vite 的环境变量
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router