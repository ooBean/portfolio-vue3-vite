<template>
  <div class="gallery" :preview="previewMode" ref="galleryRef">
    <BackLink v-if="!hideBackLink" component="gallery" class="top-right-link" />

    <!-- 空数据提示 -->
    <div v-if="!loading && portfolioStore.galleryImages.length === 0" class="empty-message">
      No images found.
    </div>

    <!-- 图片网格 -->
    <div v-else class="image-grid">
      <div v-for="(image, index) in portfolioStore.galleryImages" :key="index" class="image-item">
        <img :src="image.urls.small" :alt="image.alt_description || 'Gallery Image'" />
      </div>

      <div v-if="loading" class="loading-placeholder-outer">
        <Loading />
      </div>
    </div>
  </div>

  <ThemeBackground />

  <TechHighlights v-if="!hideBackLink">
    <h4>{{ t('tech_highlights.gallery.title1') }}</h4>
    <p v-html="t('tech_highlights.gallery.p1')"></p>

    <h4>{{ t('tech_highlights.gallery.title2') }}</h4>
    <p v-html="t('tech_highlights.gallery.p2')"></p>

    <h4>{{ t('tech_highlights.gallery.title3') }}</h4>
    <p v-html="t('tech_highlights.gallery.p3')"></p>
  </TechHighlights>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { getImages } from '@/services';
import BackLink from '@/components/common/BackLink.vue';
import ThemeBackground from '@/components/common/ThemeBackground.vue';
import TechHighlights from '@/components/common/TechHighlights.vue';
import Loading from '@/components/common/Loading.vue';

import { onMounted, ref, onUnmounted } from 'vue';
import { usePortfolioStore } from '@/store/modules/portfolioStore';

const { t } = useI18n();

const props = defineProps({
  previewMode: { type: Boolean, default: false },
  hideBackLink: { type: Boolean, default: false }
});

const page = ref(1);
const perPage = 10;
const loading = ref(false);
const galleryRef = ref<HTMLElement | null>(null);

const portfolioStore = usePortfolioStore();

const fetchImages = async (pageNum: number) => {
  const response = await getImages({ query: 'nature', page: pageNum, perPage });
  return response.results;
};

const loadMore = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    page.value += 1;
    const images = await fetchImages(page.value);
    if (images.length > 0) {
      portfolioStore.updateGalleryImages([...portfolioStore.galleryImages, ...images]);
    }
  } finally {
    loading.value = false;
  }
};

const handleScroll = () => {
  if (!galleryRef.value) return;

  const { scrollTop, scrollHeight, clientHeight } = galleryRef.value;

  // 当滚动到底部附近时加载更多
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadMore();
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    portfolioStore.loadGalleryImagesFromStorage();
    if (portfolioStore.galleryImages.length === 0) {
      const images = await fetchImages(page.value);
      if (images.length > 0) {
        portfolioStore.updateGalleryImages(images);
      } else {
        portfolioStore.updateGalleryImages([]);
      }
    }

    // 添加滚动监听
    if (galleryRef.value) {
      galleryRef.value.addEventListener('scroll', handleScroll);
    }
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  // 清理滚动监听
  if (galleryRef.value) {
    galleryRef.value.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.top-right-link {
  background: rgba(255, 255, 255, 0.1);
  color: var(--todolist-text-color, #fff);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: fixed;
  top: 100px;
  right: 38px;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
}

.theme-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.gallery {
  position: relative;
  z-index: 1;
  background-color: transparent !important;
  margin: 1rem !important;
  padding: 1rem !important;
  color: var(--todolist-text-color, $todolist-theme-light-text-color);
  border-radius: 8px;
  max-height: 80vh !important;
  overflow-y: auto !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: block;
  height: 100%;
}

.empty-message {
  margin-top: 2rem;
  text-align: center;
  color: var(--todolist-text-color, #999);
  font-size: 1rem;
}

.image-grid {
  column-count: 4;
  column-gap: 1rem;

  @media (max-width: 1200px) {
    column-count: 3;
  }

  @media (max-width: 768px) {
    column-count: 2;
  }

  @media (max-width: 480px) {
    column-count: 1;
  }
}

// 原 image-item 样式保持不变

// 🔁 新增这个样式
.loading-placeholder-outer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

.image-item {
  break-inside: avoid;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.loading-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  /* 可改为与图片高度相符的固定值 */
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .gallery {
    padding: 1rem;
    font-size: 0.95rem;
  }
}
</style>
