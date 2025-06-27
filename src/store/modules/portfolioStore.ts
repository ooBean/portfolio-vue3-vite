import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const usePortfolioStore = defineStore('portfolio', () => {
  const loading = reactive<Record<string, boolean>>({});
  const projectsList = [
    { id: 'todolist' },
    { id: 'chat' },
    { id: 'form' },
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

  return {
    loading,
    projectsList,
    initLoading,
  };
});
