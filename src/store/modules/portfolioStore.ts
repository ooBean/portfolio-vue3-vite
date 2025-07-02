import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

const STORAGE_KEY = 'portfolio-gallery-images';

export const usePortfolioStore = defineStore('portfolio', () => {
  const loading = reactive<Record<string, boolean>>({});
  const galleryImages = ref<any[]>([]);

  const projectsList = [
    { id: 'todo' },
    { id: 'chat' },
    { id: 'form' },
    { id: 'gallery' },
  ];

  // 初始化 loading 状态，只执行一次
  const initLoading = () => {
    projectsList.forEach(project => {
      if (loading[project.id] === undefined) {
        loading[project.id] = true;
      }
    });

    projectsList.forEach((project, index) => {
      setTimeout(() => {
        loading[project.id] = false;
      }, 1000 * (index + 1));
    });
  };

  // 从 sessionStorage 读取 galleryImages
  const loadGalleryImagesFromStorage = () => {
    const data = sessionStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        galleryImages.value = JSON.parse(data);
      } catch {
        galleryImages.value = [];
      }
    }
  };

  // 保存 galleryImages 到 sessionStorage
  const saveGalleryImagesToStorage = () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(galleryImages.value));
  };

  // 更新 galleryImages 并保存
  const updateGalleryImages = (images: any[]) => {
    galleryImages.value = images;
    saveGalleryImagesToStorage();
  };

  return {
    loading,
    projectsList,
    initLoading,
    galleryImages,
    loadGalleryImagesFromStorage,
    updateGalleryImages
  };
});
