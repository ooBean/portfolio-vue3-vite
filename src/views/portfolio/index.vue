<template>
  <div :class="['portfolio-view', { 'light-theme-override': !isPortfolioRoute }]">
    <h1 class="view-title">{{ t('portfolio.title') }}</h1>

    <div class="subtitle-container">
      <p class="view-description">{{ t('portfolio.description') }}</p>
      <ThemeSwitcher :current-theme="currentTheme" @theme-change="handleThemeChange" />
    </div>

    <div v-if="error" class="error-message">{{ t('portfolio.error_loading') }}</div>
    <div class="projects-grid">
      <PreviewCard v-for="project in projects" :key="project.id" :project="project"
        :loading="portfolioStore.loading[project.id] || false" @click="navigateToProject(project.route)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Todo from '@/views/portfolio/Todo.vue';
import Chat from '@/views/portfolio/Chat.vue';
import InteractiveCard from '@/views/portfolio/InteractiveCard.vue';
import Gallery from '@/views/portfolio/Gallery.vue';
import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue';
import PreviewCard from '@/components/common/PreviewCard.vue';
import { usePortfolioStore } from '@/store/modules/portfolioStore';
import { useUiStore } from '@/store/modules/uiStore';
import ImageHoverEffects from '@/views/portfolio/ImageHoverEffects.vue';

type Theme = 'theme-light' | 'theme-dark' | 'theme-warm';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const portfolioStore = usePortfolioStore();
const uiStore = useUiStore();

// 检测当前路由是否 portfolio 或其子路由
const isPortfolioRoute = computed(() => {
  return route.name === 'Portfolio' ||
    (typeof route.name === 'string' && route.name.startsWith('Portfolio'));
});

function isTheme(value: any): value is Theme {
  return ['theme-light', 'theme-dark', 'theme-warm'].includes(value);
}

const applyThemeToGlobalElement = (themeClassName: Theme) => {
  const themes: Theme[] = ['theme-light', 'theme-dark', 'theme-warm'];
  document.body.classList.remove(...themes);
  document.body.classList.add(themeClassName);
};

const currentTheme = ref<Theme>(uiStore.theme);
const THEME_STORAGE_KEY = 'portfolio-selected-theme';

const handleThemeChange = (themeClassName: string) => {
  if (isTheme(themeClassName)) {
    currentTheme.value = themeClassName;
    uiStore.setTheme(themeClassName);
    sessionStorage.setItem(THEME_STORAGE_KEY, themeClassName);
    applyThemeToGlobalElement(themeClassName);
  }
};

watch(() => route.name, (newName) => {
  // 无操作，仅触发响应式更新
});

onMounted(() => {
  // Detect system color scheme preference
  const savedTheme = sessionStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme && isTheme(savedTheme)) {
    currentTheme.value = savedTheme;
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? 'theme-dark' : 'theme-light';
    currentTheme.value = defaultTheme;
    uiStore.setTheme(defaultTheme);
    sessionStorage.setItem(THEME_STORAGE_KEY, defaultTheme);
    applyThemeToGlobalElement(defaultTheme);
  }

  portfolioStore.initLoading();
});

const projectsList = [
  {
    id: 'InteractiveCard',
    nameKey: 'portfolio.interactive_card.title',
    descriptionKey: 'portfolio.interactive_card.description',
    component: InteractiveCard,
    route: 'InteractiveCard'
  },
  {
    id: 'todo',
    nameKey: 'portfolio.todolist.title',
    descriptionKey: 'portfolio.todolist.description',
    component: Todo,
    route: 'Todo',
  },
  {
    id: 'imagehovereffects',
    nameKey: 'portfolio.hover_effects.title',
    descriptionKey: 'portfolio.hover_effects.description',
    component: ImageHoverEffects,
    route: 'ImageHoverEffects',
  },
  {
    id: 'gallery',
    nameKey: 'portfolio.gallery.title',
    descriptionKey: 'portfolio.gallery.description',
    component: Gallery,
    route: 'Gallery',
  },
  {
    id: 'chat',
    nameKey: 'portfolio.chat.title',
    descriptionKey: 'portfolio.chat.description',
    component: Chat,
    route: 'Chat',
  },

];

const error = ref(false);

const projects = computed(() => {
  return projectsList.map(p => ({
    id: p.id,
    name: t(p.nameKey),
    description: t(p.descriptionKey),
    component: p.component,
    route: p.route
  }));
});

const navigateToProject = (routeName: string) => {
  router.push({ name: routeName });
};
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

// 非 portfolio 路由 强制使用 light 主题部分色值覆盖
.light-theme-override {
  background-color: #fff !important;
  color: #2c3e50 !important;
  border-bottom: 1px solid #e0e0e0 !important;
  box-shadow: 0 0 10px rgba(224, 224, 224, 0.6) !important;
}

// 以上仅调整最明显属性，如需更细的覆盖可再补充

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

.loading-indicator,
.error-message {
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

  &::after {
    // Tooltip for project name
    content: attr(data-tooltip);
    position: absolute;
    bottom: 105%; // Position above the card
    left: 50%;
    transform: translateX(-50%) translateY(8px); // Initial hide
    background: var(--chat-other-message-bg, rgba(0, 0, 0, 0.8)); // Themeable tooltip
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