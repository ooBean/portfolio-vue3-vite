<template>
  <router-link :to="to" class="back-link" :class="{ 'light': light }">
    <i class="material-icons" aria-hidden="true">⬅</i>
    <span>{{ text || t(textKey) }}</span>
  </router-link>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  // 目标路由，默认返回作品集
  to: {
    type: [String, Object],
    default: '/portfolio'
  },
  // 如果提供了文本，则直接使用
  text: {
    type: String,
    default: ''
  },
  // 国际化文本键，默认为返回作品集
  textKey: {
    type: String,
    default: 'common.back_to_portfolio'
  },
  // 使用浅色样式（在深色背景上）
  light: {
    type: Boolean,
    default: false
  },
  // 使用哪个组件的主题变量
  component: {
    type: String,
    default: 'todolist' // 'todolist' 或 'chat'，决定使用哪个组件的CSS变量
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.back-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  text-decoration: none;
  opacity: 0.7;
  transition: all 0.3s ease;
  
  &:not(.light) {
    color: var(--todolist-text-color, var(--chat-text-color, $text-color));
  }
  
  &.light {
    color: var(--light-text-color, #fff);
  }
  
  i {
    font-size: 1.1rem;
    margin-right: 0.25rem;
  }
  
  span {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      transition: width 0.3s ease;
    }
  }
  
  &:hover {
    opacity: 1;
    
    span::after {
      width: 100%;
    }
  }
  
  &:not(.light):hover span::after {
    background-color: var(--todolist-text-color, var(--chat-text-color, $text-color));
  }
  
  &.light:hover span::after {
    background-color: var(--light-text-color, #fff);
  }
}
</style>