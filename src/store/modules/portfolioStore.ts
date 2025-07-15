import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

const STORAGE_KEY = 'portfolio-gallery-images';

export const usePortfolioStore = defineStore('portfolio', () => {
  const loading = reactive<Record<string, boolean>>({});
  const galleryImages = ref<any[]>([]);

  const projectsList = [
    { id: 'todo' },
    { id: 'chat' },
    { id: 'gallery' },
    { id: 'imagehovereffects' },
  ];

  // 修改 initLoading 只处理 gallery 项目 loading 状态，且根据 galleryImages 是否存在停止 loading
  const initLoading = () => {
    projectsList.forEach(project => {
      if (project.id === 'gallery') {
        if (loading[project.id] === undefined) {
          loading[project.id] = true;
        }
        // 如果 galleryImages 已有数据，立即停止 loading
        if (galleryImages.value.length > 0) {
          loading[project.id] = false;
        }
      } else {
        loading[project.id] = false;
      }
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
