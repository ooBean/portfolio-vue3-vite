<template>
  <div class="project-card" @click="$emit('click')" :data-tooltip="project.name">
    <div class="loading-container" v-if="loading">
      <Loading />
    </div>
    <div class="content-container" v-else>
      <div class="project-preview">
        <component :is="project.component" class="scaled-component" :key="project.id"/>
      </div>
      <div class="project-info">
        <h3>{{ project.name }}</h3>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-actions">
          <button @click.stop="$emit('click')" class="btn-view">查看</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/common/Loading.vue';

interface Project {
  id: string;
  name: string;
  description: string;
  component: any;
  route: string;
  downloadLink?: string;
}

const props = defineProps<{ project: Project; loading?: boolean }>();
const emit = defineEmits(['click', 'download']);
</script>

<style scoped lang="scss">
.project-card {
  position: relative;
  width: 320px;
  height: 340px; /* 固定整体卡片高度，220 + 120 */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  background-color: var(--todolist-bg, #fff);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
              background-color 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
  }
}

.loading-container, .content-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: var(--todolist-bg, #fff);
}

.loading-container {
  justify-content: center;
  background: var(--chat-messages-bg, #f8f9fa);
  border-radius: 12px;
  z-index: 10;
}

.project-preview {
  height: 220px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: saturate(180%) blur(10px);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  border-radius: 12px 12px 0 0;
  box-shadow: inset 0 0 30px 10px rgba(255,255,255,0.1);
  border-bottom: 1px solid rgba(255,255,255,0.3);
  display: flex;
  align-items: flex-start;
  justify-content: center;

  /* Hide scrollbar for Webkit browsers */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  @media (max-width: 480px) {
    height: 180px;
  }
}

.scaled-component {
  transform: scale(0.85);
  transform-origin: center center;
  width: 100%;
  height: auto;
  max-width: 500px;
  pointer-events: none;

  @media (max-width: 480px) {
    transform: scale(0.7);
  }
}

.project-info {
  padding: 1.25rem;
  text-align: left;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: inherit;

  @media(max-width: 480px) {
    height: auto;
    padding: 0.75rem 1rem;
  }
}

.project-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: inherit;
}

.project-description {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
  line-height: 1.5;
  flex-grow: 1;
  color: inherit;
}

.project-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transform-origin: top center;
  transform: scaleY(0.8);
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
              max-height 0.5s cubic-bezier(0.25, 0.8, 0.25, 1),
              margin-top 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
              transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.project-actions button {
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  will-change: transform, opacity;
  transform: translateY(12px);
  opacity: 0;
  transition: background-color 0.25s ease,
              transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 0.25s cubic-bezier(0.25, 0.8, 0.25, 1),
              color 0.3s ease;
}

.project-actions button.btn-view {
  background-color: var(--chat-accent-color, #FFC0CB);
  color: var(--chat-button-text-color, white);
  transition-delay: 0.05s;
}

.project-card:hover .project-actions {
  opacity: 1;
  max-height: 60px;
  margin-top: 0.8rem;
  transform: scaleY(1);
}

.project-card:hover .project-actions button {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.08s;
}
</style>
