<template>
  <div class="portfolio-view">
    <h1 class="view-title">{{ t('portfolio.title') }}</h1>

    <div class="subtitle-container">
      <p class="view-description">{{ t('portfolio.description') }}</p>
      <ThemeSwitcher
        :current-theme="currentTheme"
        @theme-change="handleThemeChange"
      />
    </div>

    <div v-if="error" class="error-message">{{ t('portfolio.error_loading') }}</div>
    <div class="projects-grid">
      <PreviewCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        :loading="loading[project.id] || false"
        @click="navigateToProject(project.route)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import TodoListView from '@/views/portfolio/TodoListView.vue';
import ChatView from '@/views/portfolio/ChatView.vue';
import FormDemo from '@/views/portfolio/FormDemo.vue';
import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue';
import PreviewCard from '@/components/common/PreviewCard.vue';
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

// 项目基础列表数据，用于初始化加载状态
const projectsList = [
  {
    id: 'todolist',
    nameKey: 'portfolio.todolist.title',
    descriptionKey: 'portfolio.todolist.description',
    component: TodoListView,
    route: 'TodoListView',
  },
  {
    id: 'chat',
    nameKey: 'portfolio.chat.title',
    descriptionKey: 'portfolio.chat.description',
    component: ChatView,
    route: 'ChatView',
  },
  {
    id: 'form',
    nameKey: 'portfolio.form.title',
    descriptionKey: 'portfolio.form.description',
    component: FormDemo,
    route: 'FormDemo',
  },
];

const loading = reactive<Record<string, boolean>>({}); // 每个项目独立loading状态
const error = ref(false);

// 动态生成项目列表，结合i18n翻译
const projects = computed(() => {
  return projectsList.map(p => ({
    id: p.id,
    name: t(p.nameKey),
    description: t(p.descriptionKey),
    component: p.component,
    route: p.route
  }));
});

// 初始化所有项目loading状态为true，模拟加载
onMounted(() => {
  projectsList.forEach(project => {
    loading[project.id] = true;
  });

  projectsList.forEach((project, index) => {
    setTimeout(() => {
      loading[project.id] = false;
    }, 1000 * (index + 1));
  });
});

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
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: var(--chat-bg, $light-grey);
  color: var(--chat-text-color, $text-color);
}

.view-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  color: inherit;
}

.subtitle-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.view-description {
  font-size: 1.1rem;
  color: inherit;
  opacity: 0.8;
  max-width: 700px;
  margin: 0;
}

/* 媒体查询，确保响应式 */
@media (max-width: 768px) {
  .subtitle-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .view-description {
    margin-bottom: 1rem;
    text-align: center;
  }
}

/* 其余样式保持不变 */
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
  background: var(--chat-messages-bg, $light-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--chat-title-border, $grey-light);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.scaled-component {
  transform: scale(0.55);
  transform-origin: center center;
  width: 100%;
  height: auto;
  max-width: 500px;
  pointer-events: none;
}

.project-info {
  padding: 1.25rem;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: inherit;
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
  margin-top: 0.5rem;
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
  border-radius: $border-radius-sm;
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
  background-color: var(--chat-accent-color, $primary-color);
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