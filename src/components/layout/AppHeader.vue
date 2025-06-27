<template>
  <header class="app-header" :class="{ 'dark-theme-text': uiStore.theme === 'theme-dark' }">
    <div class="user-info">
      <img src="@/assets/images/profile-avatar.jpg" alt="User Avatar" />
      <div class="details">
        <p class="user-name">{{ t('home.user_name_placeholder') }}</p>
        <p class="user-job">{{ t('home.job') }}</p>
      </div>
    </div>

    <button class="menu-toggle" @click="toggleMenu" :aria-expanded="isMenuOpen" aria-label="Toggle Menu">
      <span v-if="!isMenuOpen">☰</span>
      <span v-else>✕</span>
    </button>

    <nav class="main-nav desktop" v-if="!isMobile">
      <router-link to="/" class="nav-link" exact>{{ t('navigation.home') }}</router-link>
      <router-link to="/portfolio" class="nav-link">{{ t('navigation.portfolio') }}</router-link>
      <router-link to="/about" class="nav-link">{{ t('navigation.about') }}</router-link>
      <router-link to="/contact" class="nav-link">{{ t('navigation.contact') }}</router-link>
      <LanguageSwitcher />
    </nav>

    <transition name="fade">
      <div class="menu-overlay" v-if="isMenuOpen" @click.self="closeMenu">
        <nav class="mobile-menu">
          <router-link to="/" class="nav-link" @click="closeMenu">{{ t('navigation.home') }}</router-link>
          <router-link to="/portfolio" class="nav-link" @click="closeMenu">{{ t('navigation.portfolio') }}</router-link>
          <router-link to="/about" class="nav-link" @click="closeMenu">{{ t('navigation.about') }}</router-link>
          <router-link to="/contact" class="nav-link" @click="closeMenu">{{ t('navigation.contact') }}</router-link>
          <div class="mobile-language-wrapper">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';
import { useUiStore } from '@/store/modules/uiStore';

const { t } = useI18n();
const isMenuOpen = ref(false);
const isMobile = ref(false);
const uiStore = useUiStore();

let mediaQuery: MediaQueryList;

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

const updateMobileStatus = () => {
  isMobile.value = mediaQuery.matches;
};

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 768px)');
  updateMobileStatus();
  mediaQuery.addEventListener('change', updateMobileStatus);
});

onBeforeUnmount(() => {
  mediaQuery.removeEventListener('change', updateMobileStatus);
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--header-bg, $white);
  border-bottom: 1px solid var(--header-border, $border-color);
  box-shadow: var(--header-shadow, none);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;

  min-height: 56px;

  .user-info {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 0.8rem;
    }

    .details {
      display: flex;
      flex-direction: column;
      line-height: 1.2;

      .user-name {
        font-weight: 600;
        font-size: 0.95rem;
        color: var(--text-color);
      }

      .user-job {
        font-size: 0.75rem;
        color: rgba(var(--text-color-rgb), 0.7);
      }
    }
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.6rem;
    color: var(--text-color);
    cursor: pointer;

    @media (max-width: 768px) {
      display: block;
    }
  }

  .main-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .nav-link {
      text-decoration: none;
      color: var(--text-color);
      font-size: 0.9rem;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background: $primary-color;
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.25s ease-out;
      }

      &:hover::after,
      &.router-link-exact-active::after {
        transform: scaleX(1);
      }
    }

    &.desktop {
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
}

/* Overlay for mobile menu */
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 5rem;

  .mobile-menu {
    background: var(--background-color);
    padding: 2rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;

    .nav-link {
      font-size: 1.2rem;
      color: var(--text-color);
      text-decoration: none;
    }
  }

  .mobile-language-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    .language-switcher {
      position: relative !important; // 强制覆盖默认 absolute
      transform: none !important;
      left: auto !important;
      top: auto !important;
    }

    .language-options {
      top: calc(100% + 4px) !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      z-index: 2000;
    }
  }
}

// 动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.theme-dark-text {
  color: $light-text-color !important;
}
</style>
