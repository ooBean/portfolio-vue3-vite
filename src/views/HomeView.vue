// filepath: portfolio-vue3-vite/src/views/HomeView.vue
<template>
  <div class="home-view">
    <div class="hero-content">
      <div class="hero-text">
        <h1>{{ t('home.greeting_new_style.line1') }}<br />{{ t('home.greeting_new_style.line2', { name: userName }) }}</h1>
        <p>{{ t('home.description_new_style', { location: userLocation }) }}</p>
        <div class="social-links">
          <a v-for="link in socialMedia" :key="link.name" :href="link.url" target="_blank" rel="noopener noreferrer" :aria-label="link.name">
            {{ link.abbr }}
          </a>
        </div>
      </div>
      <div class="hero-image-container">
        <div class="image-wrapper">
          <img src="@/assets/images/profile-avatar.jpg" alt="Profile Avatar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 使用 computed 而不是 ref，这样语言切换时会自动更新
const userName = computed(() => t('home.user_name_placeholder'));
const userLocation = computed(() => t('home.user_location_placeholder'));

interface SocialLink {
  name: string;
  abbr: string;
  url: string;
}

const socialMedia = ref<SocialLink[]>([
  { name: 'Twitter', abbr: 'TW', url: '#' },
  { name: 'GitHub', abbr: 'GH', url: '#' },
  { name: 'Instagram', abbr: 'IG', url: '#' },
  { name: 'LinkedIn', abbr: 'LI', url: '#' },
  { name: 'Dribbble', abbr: 'DV', url: '#' },
  { name: 'YouTube', abbr: 'YT', url: '#' },
]);
</script>

<style scoped lang="scss">
// SCSS 变量已通过 vite.config.ts 全局注入 (来自 @/assets/styles/variables.scss)
//可以直接使用 $hero-bg-color, $hero-text-color 等变量

.home-view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 2rem 4rem;
  background-color: $hero-bg-color; // 直接使用 SCSS 变量
  width: 100%;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  max-width: 1100px;
  width: 100%;
}

// --- Hero Text Section ---
.hero-text {
  flex: 1;
  max-width: 500px;

  h1 {
    font-family: 'Georgia', serif; // 考虑是否也放入 variables.scss
    font-size: clamp(2.5rem, 5vw, 3.8rem);
    color: $hero-heading-color; // 直接使用 SCSS 变量
    line-height: 1.2;
    margin-bottom: 1.5rem;
    font-weight: normal;
  }

  p {
    font-size: clamp(1rem, 2.5vw, 1.15rem);
    color: $hero-text-color; // 直接使用 SCSS 变量
    line-height: 1.7;
    margin-bottom: 2rem;
  }
}

.social-links {
  display: flex;
  gap: 1.5rem;

  a {
    font-family: 'Inter', sans-serif; // 考虑是否也放入 variables.scss
    text-decoration: none;
    color: $hero-social-link-color; // 直接使用 SCSS 变量
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    transition: color 0.2s ease;

    &:hover {
      color: $hero-heading-color; // 直接使用 SCSS 变量
    }
  }
}

// --- Hero Image Section ---
.hero-image-container {
  flex-shrink: 0;
  position: relative;
}

.image-wrapper {
  width: clamp(200px, 30vw, 300px);
  height: clamp(200px, 30vw, 300px);
  border-radius: 50%;
  border: 6px dotted $hero-accent-pink; // 直接使用 SCSS 变量
  padding: 8px;
  background-color: $hero-bg-color; // 直接使用 SCSS 变量
  box-shadow: 0 0 20px rgba(color.scale($hero-accent-pink, $alpha: -70%), 0.3); // 使用 color.scale 调整透明度，并确保 rgba 的 alpha 在 0-1 之间

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
}

// --- Responsive Adjustments ---
@media (max-width: $breakpoint-md) { // 使用 variables.scss 中的断点变量
  .hero-content {
    flex-direction: column-reverse;
    text-align: center;
    gap: 2rem;
  }

  .hero-text {
    align-items: center; // 对于 flex 容器，这通常用于交叉轴对齐
    max-width: 100%;
  }

  .social-links {
    justify-content: center;
  }
}
</style>