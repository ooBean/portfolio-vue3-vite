<template>
  <div class="language-switcher" :class="[mode === 'dark' ? 'mode-dark' : 'mode-light']" ref="switcherRef">
    <div class="language-display" @click="toggleDropdown">
      {{ currentLanguageName }}
      <span class="arrow" :class="{ up: isOpen }"></span>
    </div>
    <transition name="fade-fast">
      <ul v-if="isOpen" class="language-options">
        <li
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          :class="{ active: currentLanguage === lang.code }"
        >
          {{ lang.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useI18nStore } from '@/store/modules/i18nStore';

import type { Language } from '@/types/unsplash';

const { locale, availableLocales } = useI18n();
const i18nStore = useI18nStore();
const currentLocale = ref<Language>(locale.value as Language);

// 新增：接收 mode 属性，默认为 'light'
const props = defineProps({
  mode: {
    type: String as () => 'light' | 'dark',
    default: 'light',
  },
});

const switcherRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectLanguage = (lang: string) => {
  const newLang = lang as Language;
  i18nStore.setLanguage(newLang);
  locale.value = newLang;
  isDropdownOpen.value = false;
  isOpen.value = false;
};

const getLanguageLabel = (lang: string) => {
  switch (lang) {
    case 'en': return 'English';
    case 'zh': return '简体中文';
    case 'zh-TW': return '繁體中文';
    default: return lang;
  }
};

const currentLanguageName = computed(() => getLanguageLabel(currentLocale.value));
const currentLanguage = computed(() => currentLocale.value);
const languages = computed(() => availableLocales.map(code => ({
  code,
  name: getLanguageLabel(code)
})));

const changeLanguage = (lang: string) => {
  selectLanguage(lang);
};

watch(locale, (newLocale) => {
  currentLocale.value = newLocale as Language;
});

// 监听点击外部自动关闭
const handleClickOutside = (e: MouseEvent) => {
  if (switcherRef.value && !switcherRef.value.contains(e.target as Node)) {
    isDropdownOpen.value = false;
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.language-switcher {
  position: relative;
  font-size: 0.9rem;
  user-select: none;
}

.language-display {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: background-color 0.2s, border-color 0.2s;
}

.arrow {
  margin-left: 0.5rem;
  border: solid;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2.5px;
  transform: rotate(45deg);
  transition: transform 0.2s ease-in-out;
  &.up {
    transform: rotate(-135deg);
  }
}

.language-options {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  border-radius: 8px;
  min-width: 120px;
  z-index: 1100;

  li {
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }
}

/* 亮色模式样式 (默认) */
.mode-light {
  .language-display {
    color: var(--text-color);
    border: 1px solid $border-color;
    &:hover {
      background-color: $border-color;
    }
  }
  .language-options {
    background: #fff;
    border: 1px solid $border-color;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    li {
      color: $text-color; /* 修改：使用 SCSS 变量以确保在任何主题下都是深色文本 */
      &:hover {
        background-color: $border-color;
      }
      &.active {
        background-color: rgba($primary-color, 0.1); /* 修改：使用 rgba 动态生成浅色背景 */
        color: $primary-color;
      }
    }
  }
}

/* 暗色模式样式 (用于移动端菜单) */
.mode-dark {
  .language-display {
    color: $light-text-color;
    border: 1px solid rgba(255, 255, 255, 0.3);
    .arrow {
      border-color: $light-text-color;
    }
  }
  .language-options {
    background: rgba(55, 55, 55, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: none;
    li {
      color: $light-text-color;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.active {
        background-color: rgba(255, 255, 255, 0.15);
        color: #fff;
        font-weight: bold;
      }
    }
  }
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>