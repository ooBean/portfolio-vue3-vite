<template>
  <div>
    <!-- 触发按钮 -->
    <button class="highlights-trigger" @click="togglePanel">
      <span>技术亮点</span>
    </button>

    <!-- 面板 -->
    <div class="highlights-panel" :class="{ 'is-open': isPanelOpen }">
      <div class="panel-header">
        <h3>技术实现亮点</h3>
        <button class="close-btn" @click="togglePanel">&times;</button>
      </div>
      <div class="panel-content">
        <!-- 父组件的内容将在这里显示 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isPanelOpen = ref(false);

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.highlights-trigger {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-color: rgba($primary-color, 0.8);
  color: white;
  border: none;
  padding: 10px 8px;
  cursor: pointer;
  z-index: 1000;
  border-radius: 8px 0 0 8px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  letter-spacing: 2px;

  &:hover {
    background-color: $primary-color;
  }
}

.highlights-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  max-width: 90vw;
  height: 100vh;
  background-color: rgba(30, 35, 50, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
  color: #fff;
  z-index: 1001;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;

  &.is-open {
    transform: translateX(0);
  }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;

  h3 {
    margin: 0;
    font-size: 1.25rem;
  }
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 2.2rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.7;
  padding: 0 5px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
}

.panel-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex-grow: 1;

  /* --- Start: Hide scrollbar --- */
  /* For Firefox */
  scrollbar-width: none;
  /* For Internet Explorer and Edge */
  -ms-overflow-style: none;

  /* For Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  :deep(h4) {
    color: $primary-color;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba($primary-color, 0.5);
    padding-bottom: 0.5rem;

    &:first-child {
      margin-top: 0;
    }
  }

  :deep(p) {
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 1rem;
  }

  :deep(code) {
    background-color: rgba(255, 255, 255, 0.15);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
  }
}
</style>