<template>
  <div class="portfolio-view"> 
    <h1 class="view-title">{{ t('portfolio.title') }}</h1>
    <p class="view-description">{{ t('portfolio.description') }}</p>

    <ThemeSwitcher 
      :current-theme="currentTheme"
      @theme-change="handleThemeChange" 
    />

    <div v-if="loading" class="loading-indicator">{{ t('portfolio.loading') }}</div>
    <div v-else-if="error" class="error-message">{{ t('portfolio.error_loading') }}</div>
    <div v-else class="projects-grid">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project-card"
        @click="navigateToProject(project.route)"
        :data-tooltip="project.name"
      >
        <div class="project-preview">
          <component :is="project.component" class="scaled-component" />
        </div>
        <div class="project-info">
          <h3>{{ project.name }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-actions">
            <button @click.stop="navigateToProject(project.route)" class="btn-view">
              {{ t('portfolio.view_project') }}
            </button>
            <!-- <button v-if="project.downloadLink" @click.stop="downloadProject(project.downloadLink)" class="btn-download">
              {{ t('portfolio.download_source') }}
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import TodoListView from '@/views/portfolio/TodoListView.vue';
import ChatView from '@/views/portfolio/ChatView.vue';
import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue'; // 引入组件

const { t } = useI18n();
const router = useRouter();

// 主题管理
const defaultTheme = 'theme-light';
const currentTheme = ref(defaultTheme);
const THEME_STORAGE_KEY = 'portfolio-selected-theme';

// Function to apply theme class to a global element (e.g., body)
const applyThemeToGlobalElement = (themeClassName: string) => {
  const themes = ['theme-light', 'theme-dark', 'theme-warm'];
  // Remove any existing theme classes from body
  document.body.classList.remove(...themes);
  // Add the new theme class
  document.body.classList.add(themeClassName);
};

const handleThemeChange = (themeClassName: string) => {
  currentTheme.value = themeClassName;
  localStorage.setItem(THEME_STORAGE_KEY, themeClassName);
  applyThemeToGlobalElement(themeClassName); // Apply to body
};

onMounted(() => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  let themeToApply = defaultTheme;
  if (savedTheme && ['theme-light', 'theme-dark', 'theme-warm'].includes(savedTheme)) {
    themeToApply = savedTheme;
  }
  currentTheme.value = themeToApply;
  applyThemeToGlobalElement(themeToApply); // Apply on mount
});

interface Project {
  id: string;
  name: string;
  description: string;
  component: any; // Vue component
  route: string; // Route name
  downloadLink?: string;
}

const loading = ref(false); // Set to true if fetching projects async
const error = ref(false);

// 动态生成项目列表，以便 t() 函数在 setup 作用域内
const projects = computed<Project[]>(() => [
  {
    id: 'todolist',
    name: t('portfolio.todolist.title'),
    description: t('portfolio.todolist.description'),
    component: TodoListView,
    route: 'TodoListView',
  },
  {
    id: 'chat',
    name: t('portfolio.chat.title'),
    description: t('portfolio.chat.description'), // Add description for chat
    component: ChatView,
    route: 'ChatView',
  },
  // Add more projects here
]);

const navigateToProject = (routeName: string) => {
  router.push({ name: routeName });
};

// const downloadProject = (link: string) => {
//   window.open(link, '_blank');
// };
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.portfolio-view {
  padding: 2rem;
  min-height: 100vh;
  // The theme-specific background and text colors will be applied
  // by the .theme-light, .theme-dark, .theme-warm classes from base.scss
  // For example, if you want a default transition for the portfolio view itself:
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: var(--chat-bg, $light-grey); // Fallback if CSS var not set
  color: var(--chat-text-color, $text-color); // Fallback
}

.view-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  color: inherit; // Inherit from .portfolio-view
}

.view-description {
  font-size: 1.1rem;
  color: inherit; // Inherit from .portfolio-view
  opacity: 0.8;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

// Styles for .projects-grid, .project-card, etc. remain largely the same,
// as their theme-specific colors are controlled by CSS variables
// defined under .theme-light, .theme-dark, .theme-warm.

.loading-indicator, .error-message {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 3rem;
  color: inherit;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin: 0 auto; // Removed top/bottom margin as ThemeSwitcher adds some
  max-width: 1200px;
}

.project-card {
  background-color: var(--todolist-bg, $white); // Example: use a theme variable
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
              box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
              background-color 0.3s ease; // Added background transition
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }

  &::after { // Tooltip for project name
    content: attr(data-tooltip);
    position: absolute;
    bottom: 105%; // Position above the card
    left: 50%;
    transform: translateX(-50%) translateY(8px); // Initial hide
    background: var(--chat-other-message-bg, rgba(0,0,0,0.8)); // Themeable tooltip
    color: var(--chat-text-color, white); // Themeable tooltip text
    padding: 6px 12px;
    border-radius: $border-radius-sm;
    font-size: 0.9rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transition-delay: 0.1s;
    z-index: 100;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    visibility: visible;
  }
}

.project-preview {
  height: 220px;
  overflow: hidden;
  position: relative;
  background: var(--chat-messages-bg, $light-grey); // Themeable preview background
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--chat-title-border, $grey-light); // Themeable border
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.scaled-component {
  transform: scale(0.55); // Adjust as needed
  transform-origin: center center;
  width: 100%;
  height: auto; // Allow component to define its height within scale
  max-width: 500px; // Example max width
  pointer-events: none;
}

.project-info {
  padding: 1.25rem;
  text-align: left;
  flex-grow: 1; // Allows info to take remaining space
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Pushes actions to bottom if description is short
  color: inherit; // Inherit from .project-card which inherits from .portfolio-view

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: inherit;
  }

  .project-description {
    font-size: 0.9rem;
    opacity: 0.8; // Use opacity instead of hardcoded color
    margin-bottom: 1rem;
    line-height: 1.5;
    flex-grow: 1;
    color: inherit;
  }
}

.project-actions {
  display: flex;
  gap: 8px;
  margin-top: 0.5rem; // Auto margin if description is short
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transform-origin: top center;
  transform: scaleY(0.8);
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
              max-height 0.5s cubic-bezier(0.25, 0.8, 0.25, 1),
              margin-top 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
              transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  button {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
    border: none;
    border-radius: $border-radius-sm;
    cursor: pointer;
    will-change: transform, opacity;
    transform: translateY(12px);
    opacity: 0;
    transition: background-color 0.25s ease, 
                transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), 
                opacity 0.25s cubic-bezier(0.25, 0.8, 0.25, 1),
                color 0.3s ease; // Added color transition

    &.btn-view {
      background-color: var(--chat-accent-color, $primary-color); // Themeable
      color: var(--chat-button-text-color, white); // Themeable
      transition-delay: 0.05s;

      &:hover {
        filter: brightness(90%);
        transform: translateY(-2px);
      }
    }
  }
}

.project-card:hover .project-actions {
  opacity: 1;
  max-height: 60px;
  margin-top: 0.8rem;
  transform: scaleY(1);

  button {
    transform: translateY(0);
    opacity: 1;
    &:nth-child(2) { transition-delay: 0.08s; }
  }
}

// Ensure portfolio.chat.description is added to your locale files
// e.g., "description": "A simple real-time chat application demo using simulated WebSocket.",
</style>