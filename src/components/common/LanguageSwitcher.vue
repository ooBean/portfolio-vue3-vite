<template>
  <div class="language-switcher" ref="switcherRef">
    <button type="button" class="language-display" aria-haspopup="true" :aria-expanded="isDropdownOpen"
      @click="toggleDropdown">
      <span>{{ getLanguageLabel(currentLocale) }}</span>
      <span class="arrow-down" aria-hidden="true">▼</span>
    </button>

    <transition name="fade-slide">
      <ul v-show="isDropdownOpen" class="language-options" role="menu">
        <li v-for="lang in availableLocales" :key="lang" @click="selectLanguage(lang)"
          :class="{ active: lang === i18nStore.currentLang }" role="menuitem"
          :aria-selected="lang === i18nStore.currentLang ? 'true' : 'false'" tabindex="0">
          {{ getLanguageLabel(lang) }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useI18nStore } from '@/store/modules/i18nStore';

type Language = 'en' | 'zh' | 'zh-TW';

const { locale, availableLocales } = useI18n();
const i18nStore = useI18nStore();
const currentLocale = ref<Language>(locale.value as Language);

const isDropdownOpen = ref(false);
const switcherRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectLanguage = (lang: string) => {
  const newLang = lang as Language;
  i18nStore.setLanguage(newLang);
  locale.value = newLang;
  isDropdownOpen.value = false;
};

const getLanguageLabel = (lang: string) => {
  switch (lang) {
    case 'en': return 'English';
    case 'zh': return '简体中文';
    case 'zh-TW': return '繁體中文';
    default: return lang;
  }
};

watch(locale, (newLocale) => {
  currentLocale.value = newLocale as Language;
});

// 监听点击外部自动关闭
const handleClickOutside = (e: MouseEvent) => {
  if (switcherRef.value && !switcherRef.value.contains(e.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.language-switcher {
  position: relative;
  display: inline-block;
  z-index: 1000;

  .language-display {
    background: transparent;
    color: #BDBDBD;
    border: none;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 0.95rem;
    transition: color 0.3s ease;

    .arrow-down {
      margin-left: 0.4em;
      transition: transform 0.25s ease;
    }

    &[aria-expanded="true"] .arrow-down {
      transform: rotate(180deg);
    }
  }

  .language-options {
    position: absolute;
    top: 100%;
    right: 0; /* 始终与父元素 .language-switcher 的右侧对齐 */
    transform: none;

    // 移除桌面端下拉菜单居中的媒体查询，让 right: 0; 始终生效
    // @media (min-width: 768px) {
    //   left: 50%;
    //   right: auto;
    //   transform: translateX(-50%);
    // }

    & {
      min-width: 160px;
      padding: 0.5rem 0;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      list-style: none;
    }

    li {
      padding: 0.5rem 1rem;
      text-align: center;
      color: #333;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f3f3f3;
      }

      &.active {
        background-color: $primary-color;
        color: white;
        font-weight: bold;
      }
    }
  }

  // 动画
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }

  .fade-slide-enter-to,
  .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>