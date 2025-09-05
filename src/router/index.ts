import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import MainLayout from '@/components/layout/MainLayout.vue';
import HomeView from '@/views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout, // 布局组件作为根组件
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
        meta: { transition: 'fade' }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: { transition: 'slide-left' }
      },
      {
        path: 'portfolio',
        name: 'Portfolio',
        component: () => import('@/views/portfolio/index.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        path: 'portfolio/Todo',
        name: 'Todo',
        component: () => import('@/views/portfolio/Todo.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        path: 'portfolio/Chat',
        name: 'Chat',
        component: () => import('@/views/portfolio/Chat.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        path: '/portfolio/DesignSystem',
        name: 'DesignSystem',
        component: () => import('@/views/portfolio/DesignSystem.vue'),
        meta: { title: 'Design System' ,transition: 'slide-right'}
      },
      {
        path: 'portfolio/InteractiveCard',
        name: 'InteractiveCard',
        component: () => import('@/views/portfolio/InteractiveCard.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        path: 'portfolio/Gallery',
        name: 'Gallery',
        component: () => import('@/views/portfolio/Gallery.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        path: 'portfolio/ImageHoverEffects',
        name: 'ImageHoverEffects',
        component: () => import('@/views/portfolio/ImageHoverEffects.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/ContactView.vue'),
        meta: { transition: 'fade' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;