<template>
  <div class="design-system-view">
    <ThemeBackground />
    <div class="container">
      <!-- New wrapper for search and back button -->
      <div class="table-header-controls">
        <div class="search-wrapper">
          <input type="search" v-model="searchQuery" placeholder="Search table..." class="search-input">
        </div>
        <div class="back-link-wrapper" :preview="previewMode">
          <BackLink v-if="!hideBackLink" component="DesignSystem" class="top-right-link" />
        </div>
      </div>

      <!-- Wrapper to make the table scroll horizontally -->
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
              <th>Column 4</th>
              <th>Column 5</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in filteredData" :key="tableData.indexOf(row)">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                <input v-if="editingRowIndex === tableData.indexOf(row)" type="text" v-model="row[cellIndex]" class="edit-input">
                <span v-else>{{ cell }}</span>
              </td>
              <td class="actions-cell">
                <div class="button-wrapper">
                  <template v-if="editingRowIndex === tableData.indexOf(row)">
                    <button @click="saveRow()" class="save-btn">Save</button>
                  </template>
                  <template v-else>
                    <button @click="deleteRow(row)" class="delete-btn">Delete</button>
                    <button @click="editRow(row)" class="edit-btn">Edit</button>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <TechHighlights v-if="!hideBackLink">
      <h4>响应式布局</h4>
      <p>本页面采用了 <code>position: absolute</code> 实现桌面端的垂直居中。同时，通过一系列精细调整的媒体查询来改变 <code>transform: translateY()</code> 的值，确保在不同尺寸的移动设备上，内容容器都能与顶栏保持合适的距离，避免重叠。</p>
      <h4>响应式表格</h4>
      <p>为解决数据表格在小屏幕上的显示问题，表格被一个外部容器包裹，并设置了 <code>overflow-x: auto</code>。这使得表格可以在其容器内部进行水平滚动，从而保证了页面的整体布局不会被破坏。</p>
      <h4>就地编辑 (In-place Editing)</h4>
      <p>表格的“就地编辑”功能，是通过 Vue 的条件渲染指令 (<code>v-if</code> / <code>v-else</code>) 动态切换普通文本和输入框来实现的。当前的编辑行索引由一个 ref 状态进行管理。</p>
    </TechHighlights>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import BackLink from '@/components/common/BackLink.vue';
import ThemeBackground from '@/components/common/ThemeBackground.vue';
// 引入新组件
import TechHighlights from '@/components/common/TechHighlights.vue';
import InteractiveCard from '@/views/portfolio/InteractiveCard.vue';

const { t } = useI18n();
const props = defineProps({
  previewMode: { type: Boolean, default: false },
  hideBackLink: { type: Boolean, default: false }
});

// State for search and editing
const searchQuery = ref('');
const editingRowIndex = ref<number | null>(null);

const tableData = reactive([
  ['ThemeSwitcher', 'Component for changing themes', 'Done', '1.1.0', '2025-08-10'],
  ['PreviewCard', 'Card for project previews', 'Done', '1.0.0', '2025-08-05'],
  ['InteractiveCard', 'Card with 3D hover effect', 'Done', '1.2.0', '2025-08-12'],
  ['DataTable', 'Component to display data tables', 'In Progress', '0.5.0', '2025-08-13'],
  ['BackLink', 'Navigation link to go back', 'Done', '1.0.0', '2025-07-28'],
]);

// Computed property to filter data based on search query
const filteredData = computed(() => {
  if (!searchQuery.value) {
    return tableData;
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase();
  return tableData.filter(row =>
    row.some(cell =>
      String(cell).toLowerCase().includes(lowerCaseQuery)
    )
  );
});

const deleteRow = (rowToDelete: string[]) => {
  const index = tableData.findIndex(row => row === rowToDelete);
  if (index > -1) {
    tableData.splice(index, 1);
  }
};

const editRow = (rowToEdit: string[]) => {
  const index = tableData.findIndex(row => row === rowToEdit);
  if (index > -1) {
    editingRowIndex.value = index;
  }
};

const saveRow = () => {
  editingRowIndex.value = null;
};

</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;
@use '@/assets/styles/base.scss' as *;

.design-system-view {
  // Add padding to the view itself to ensure content doesn't touch edges
  padding: 2rem;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
}

.table-header-controls {
  display: flex;
  align-items: center;
  gap: 1rem; // Space between search and back button
  margin-bottom: 1rem;
}

.search-wrapper {
  flex-grow: 1; // Allows search to take up available space
}

.back-link-wrapper {
  flex-shrink: 0; // Prevents the back button from shrinking
}

.top-right-link {
  background: rgba(255, 255, 255, 0.1);
  color: $text-color;
  padding: 10px 15px; // Make it same height as search
  border-radius: 8px;
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: inline-block;
  white-space: nowrap; // Prevent text wrapping

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  box-sizing: border-box;
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: $primary-color;
    box-shadow: 0 0 8px rgba($primary-color, 0.5);
  }
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 8px; // Optional: to match the table's rounded corners if any
}

table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  vertical-align: middle;
}

th {
  text-align: left;
}

thead th {
  background-color: #55608f;
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

tbody td {
  position: relative;
  isolation: isolate;
}

tbody td:hover::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -9999px;
  bottom: -9999px;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: -1;
}

.actions-cell {
  padding: 0;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}

.delete-btn, .edit-btn, .save-btn {
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
}

.delete-btn {
  background-color: #dc3545;
  &:hover { background-color: #c82333; }
}

.edit-btn {
  background-color: #6c757d;
  &:hover { background-color: #5a6268; }
}

.save-btn {
  background-color: #28a745;
  &:hover { background-color: #218838; }
}

.edit-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #55608f;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: $primary-color;
    box-shadow: 0 0 5px rgba($primary-color, 0.5);
  }
}


@media (max-width: 850px) {
  .container {
    transform: translate(-50%, -40%);
  }
}

@media (max-width: 768px) {
  .container {
    transform: translate(-50%, -34%);
  }
}

@media (max-width: 600px) {
  .container {
    transform: translate(-50%, -35%);
  }
}

@media (max-width: 480px) {
  .container {
    transform: translate(-50%, -34%);
  }
}
</style>