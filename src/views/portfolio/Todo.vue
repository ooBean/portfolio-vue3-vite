<template>
  <ThemeBackground />
  <div class="todo" :preview="previewMode">
    <form class="todolist-form" @submit.prevent="addItem">
      <div class="form-header">
        <label for="newitem">{{ t('portfolio.todolist.add_item_label') }}</label>
        <BackLink v-if="!hideBackLink" component="todolist" class="top-right-link" />
      </div>
      <div class="form-input-group">
        <input v-focus type="text" id="newitem" name="newitem" v-model="newitem"
          :placeholder="t('portfolio.todolist.input_placeholder')" />
        <button type="submit">{{ t('portfolio.todolist.add_item_button') }}</button>
      </div>
    </form>

    <div class="todolist-content">
      <ul class="tab">
        <li :class="{ active: sortByStatus === 'all' }" @click="setStatus('all')">
          {{ t('portfolio.todolist.all') }}
        </li>
        <li :class="{ active: sortByStatus === 'work' }" @click="setStatus('work')">
          {{ t('portfolio.todolist.mark_as_undone') }}
        </li>
        <li :class="{ active: sortByStatus === 'done' }" @click="setStatus('done')">
          {{ t('portfolio.todolist.mark_as_done') }}
        </li>
      </ul>

      <transition-group name="todolist" tag="ul" mode="out-in" class="todolist-items" v-if="filteredTodo.length">
        <li v-for="item in filteredTodo" :key="item.id" class="todolist-item">
          <div class="checkbox" @click="toggleDone(item)" title="Toggle complete">
            <input type="checkbox" v-model="item.done" @click.stop />
            <span>{{ item.label }}</span>
          </div>
          <a href="#" class="delete" title="Delete task" @click.stop.prevent="removeItem(item.id)"></a>
        </li>
      </transition-group>

      <p v-else class="todolist-empty">{{ t('portfolio.todolist.empty_list') }}</p>
    </div>
  </div>

  <TechHighlights v-if="!hideBackLink">
    <h4>响应式状态与持久化</h4>
    <p>组件的核心数据 (<code>todo</code> 列表) 通过 Vue 3 的 <code>ref</code> 进行管理。利用 <code>watch</code> 侦听器并设置
      <code>{ deep: true }</code>，实现了对数组内部变化的深度监听。任何变更都会被自动序列化并同步至 <code>sessionStorage</code>，从而实现了跨页面刷新的状态持久化。在组件挂载时
      (<code>onMounted</code>)，会优先从 <code>sessionStorage</code> 恢复数据。</p>

    <h4>声明式的数据计算</h4>
    <p>待办事项的筛选和排序功能是通过一个 <code>computed</code> 属性 (<code>filteredTodo</code>) 实现的。该属性根据当前的筛选状态
      (<code>sortByStatus</code>) 从原始的 <code>todo</code> 数组中派生出新的视图数据。这种声明式的方式避免了手动操作DOM，确保了数据源的唯一性和UI的同步性，代码逻辑清晰且易于维护。
    </p>

    <h4>列表过渡与交互优化</h4>
    <p>通过集成 Vue 的内置 <code>&lt;transition-group&gt;</code> 组件，为列表项的添加、删除和排序提供了平滑的动画过渡效果，提升了用户操作的视觉反馈。此外，输入框使用了自定义指令
      <code>v-focus</code>，在组件加载后自动获取焦点，优化了用户的输入体验。</p>
  </TechHighlights>
</template>

<script setup lang="ts" name="Todo">
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUiStore } from '@/store/modules/uiStore';
import BackLink from '@/components/common/BackLink.vue';
import ThemeBackground from '@/components/common/ThemeBackground.vue';
import TechHighlights from '@/components/common/TechHighlights.vue';


const props = defineProps({
  previewMode: { type: Boolean, default: false },
  hideBackLink: { type: Boolean, default: false }
});

const { t } = useI18n();
const uiStore = useUiStore();

const currentTheme = computed(() => uiStore.theme);

interface TodoItem {
  id: number;
  label: string;
  done: boolean;
}

const todo = ref<TodoItem[]>([]);
const newitem = ref('');
const sortByStatus = ref<'all' | 'work' | 'done'>('all');
const STORAGE_KEY = 'portfolio-todo-items';

onMounted(() => {
  const sessionData = sessionStorage.getItem(STORAGE_KEY);
  if (sessionData) {
    try {
      todo.value = JSON.parse(sessionData);
    } catch {
      todo.value = [];
    }
  }
});

watch(
  todo,
  (newVal) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
  },
  { deep: true }
);

const filteredTodo = computed(() => {
  switch (sortByStatus.value) {
    case 'work':
      return todo.value.filter(item => !item.done);
    case 'done':
      return todo.value.filter(item => item.done);
    default:
      return [...todo.value].sort((a, b) => Number(a.done) - Number(b.done));
  }
});

function addItem() {
  const trimmed = newitem.value.trim();
  if (trimmed) {
    todo.value.push({ id: Date.now(), label: trimmed, done: false });
    newitem.value = '';
  }
}

function toggleDone(item: TodoItem) {
  const index = todo.value.findIndex(t => t.id === item.id);
  if (index !== -1) {
    todo.value[index].done = !todo.value[index].done;
  }
}

function removeItem(id: number) {
  todo.value = todo.value.filter(item => item.id !== id);
}

function setStatus(status: 'all' | 'work' | 'done') {
  sortByStatus.value = status;
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.theme-background {
  z-index: 0 !important;
  /* 调整背景层级 */
}

.todo {
  position: relative;
  z-index: 1;
  /* background-color: transparent !important; */
  margin: 1rem !important;
  padding: 1rem !important;
  color: var(--todolist-text-color, $todolist-theme-light-text-color);
  border-radius: 8px;
  max-height: none !important;
  overflow: visible !important;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &[preview="true"] {
    /* 整体容器调整 */
    max-width: 100% !important;
    padding: 0.5rem !important;
    /* 减小内边距 */
    font-size: 0.8rem;
    /* 统一减小基础字号 */

    .todolist-form {
      width: 100%;
      margin-top: 0 !important;
      /* 移除顶部边距 */
      display: flex;
      flex-direction: column;

      .form-header {

        /* 在预览模式下，标签太占空间，直接隐藏 */
        label {
          display: none;
        }
      }

      .form-input-group {
        display: flex !important;
        flex-direction: column !important;
        /* 修改：改为垂直堆叠以适应极窄宽度 */
        gap: 0.3rem;

        input,
        button {
          height: 2.2rem !important;
          /* 减小高度 */
          font-size: 0.8rem !important;
          /* 减小字号 */
          border-radius: 4px !important;
        }

        input {
          flex-grow: 1;
          min-width: 0;
        }

        button {
          flex-shrink: 0;
          padding: 0 0.8rem;
          /* 减小内边距 */
        }
      }
    }

    .todolist-content {
      max-width: 100% !important;
      overflow: hidden !important;
      /* 防止内部元素溢出 */
      padding: 0 !important;
      /* 移除内边距 */
      margin-top: 0.5rem !important;
      /* 减小边距 */
      border: none;
      /* 移除在小卡片中不必要的边框 */
      box-shadow: none;
      /* 移除阴影 */

      .tab {
        margin-bottom: 0.5rem !important;

        /* 减小边距 */
        li {
          padding: 0.4rem 0.6rem;
          /* 减小Tab项的内边距 */
          font-size: 0.8rem;
          /* 减小字号 */
        }
      }

      .todolist-items {
        max-height: 100px !important;
        /* 大幅减小列表最大高度 */
        padding-right: 4px !important;
        /* 减小内边距 */
      }

      .todolist-item {
        padding: 0.3rem 0.4rem;
        /* 减小列表项内边距 */
        margin: 0.2rem 0;

        span {
          font-size: 0.85rem;
          /* 调整列表项文字大小 */
        }
      }
    }
  }

  .todolist-form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;

    .form-header {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
        gap: 1.75rem;
      }
    }

    label {
      margin-bottom: .5rem;
      font-size: 1.3rem;
      color: inherit;
    }

    .form-input-group {
      display: flex;
      flex-wrap: nowrap;
    }

    input[type="text"] {
      min-width: 0;
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: 1px solid var(--todolist-form-input-border);
      background: var(--todolist-form-input-bg);
      color: var(--todolist-form-input-text);
      padding: 0 1em;
      font-size: initial;
      height: 3rem;
      border-radius: 4px 0 0 4px;
      font-family: 'Quicksand', sans-serif;
      transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    button[type="submit"] {
      white-space: nowrap;
      flex-shrink: 0;
      min-width: 60px;
      padding: 0 1.3rem;
      border: 1px solid var(--todolist-form-button-border);
      background: var(--todolist-form-button-bg);
      color: var(--todolist-form-button-text);
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      transition: background .2s ease-out, color 0.3s ease, border-color 0.3s ease;
      height: 3rem;
      border-radius: 0 4px 4px 0;
      font-family: 'Quicksand', sans-serif;

      &:hover {
        filter: brightness(90%);
      }
    }
  }

  .todolist-empty {
    margin: 1rem 0;
    font-size: 0.9rem;
    color: var(--todolist-empty-text-color, rgba(0, 0, 0, 0.7));
    text-align: center;
  }

  .todolist-content {
    margin-top: 2rem;
    padding: 0 1em;
    padding: 1em;
    max-height: 280px !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    border: 1px solid rgba(0, 0, 0, 0.2); // 加深边框颜色
    // background-color: var(--chat-bg, $light-grey);
    color: var(--chat-text-color, $text-color); // 使用CSS变量控制背景色
    box-shadow: 0 2px 8px var(--chat-bg, $light-grey); // 添加阴影
    border-radius: 4px;

    .tab {
      display: flex;
      justify-content: flex-start;
      list-style-type: none;
      padding: 0;
      margin: 0 0 1.5rem 0;
      border-bottom: 1px solid var(--todolist-form-input-border);
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      /* Firefox */
      -ms-overflow-style: none;
      /* IE and Edge */
      white-space: nowrap;
    }

    .tab::-webkit-scrollbar {
      display: none;
      /* Chrome, Safari, Opera */
      width: 0px;
      height: 0px;
    }

    .tab li {
      padding: 0.75rem 1rem;
      cursor: pointer;
      position: relative;
      color: var(--todolist-tab-text-color, var(--todolist-text-color));
      font-size: 0.95rem;
      transition: color 0.3s cubic-bezier(0.77, 0, 0.175, 1);
      text-align: center;
    }

    .tab li::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--todolist-form-button-bg);
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
    }

    .tab li:hover {
      color: var(--todolist-form-button-bg);
    }

    .tab li:hover::after {
      transform: scaleX(1);
    }

    .tab li.active {
      color: var(--todolist-form-button-bg);
      font-weight: 600;
      transition: none;
    }

    .tab li.active::after {
      transform: scaleX(1);
    }

    .todolist-items {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 260px;
      overflow-y: auto;
      padding-right: 8px;
      /* Add slight padding to avoid scrollbar overlap */
      scrollbar-width: none;
      /* Firefox */
      -ms-overflow-style: none;
      /* IE and Edge */

      &::-webkit-scrollbar {
        display: none;
        /* Chrome, Safari, Opera */
        width: 0px !important;
        height: 0px !important;
      }
    }
  }
}

// 删除空的主题样式规则，避免lint报错

// 添加过渡动画
.todolist-move,
.todolist-enter-active,
.todolist-leave-active {
  transition: transform 550ms cubic-bezier(0.77, 0, 0.175, 1), opacity 550ms cubic-bezier(0.77, 0, 0.175, 1);
  will-change: transform, opacity;
}

.todolist-enter-from,
.todolist-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.todolist-enter-to,
.todolist-leave-from {
  transform: translateX(0);
  opacity: 1;
}

// 改用v-show管理任务项显隐，动画通过opacity和transform实现
.todolist-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 400ms cubic-bezier(0.77, 0, 0.175, 1), transform 400ms cubic-bezier(0.77, 0, 0.175, 1);
  opacity: 1;
}

.todolist-item[style*="display: none"] {
  opacity: 0;
  transform: translateX(20px);
  pointer-events: none;
}

// Subtle hover effect for list items
.todolist-item:hover {
  background-color: var(--todolist-item-hover-bg, rgba(0, 0, 0, 0.03));
  transform: translateX(1px);
}

// Delete button styling and stable interaction with opacity transitions
.todolist-item .delete {
  opacity: 0;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  position: relative;
  transition: opacity 0.2s ease, background-color 0.2s ease;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 14px;
    background-color: var(--todolist-delete-color, #666);
    top: 50%;
    left: 50%;
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover {
    background-color: var(--todolist-delete-hover-bg, rgba(0, 0, 0, 0.05));
  }
}

.todolist-item:hover .delete {
  opacity: 1;
}

// Checkbox styling refined for smooth transitions
.todolist-item .checkbox {
  display: flex;
  align-items: center;
}

.todolist-item .checkbox span {
  flex-grow: 1;
  /* Make label use available space for alignment */
}

.todolist-item .checkbox input[type="checkbox"] {
  margin: 0;
  margin-right: 8px;
  /* Adjust the right margin for spacing */
  vertical-align: middle;
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
  appearance: none;
  border: 2px solid var(--todolist-checkbox-border, #ddd);
  border-radius: 4px;
  transition: all 0.2s ease;
  pointer-events: auto;
}

.todolist-item .checkbox input[type="checkbox"]:checked {
  background-color: var(--primary-color, #3b82f6);
  border-color: var(--primary-color, #3b82f6);
}

.todolist-item .checkbox input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

// 设置变量默认值
:root {
  --todo-item-height: auto;
  --todo-item-padding-vertical: 0.5rem;
  --todo-item-margin-vertical: 0.5rem;
}

@media (max-width: 768px) {
  .todo {
    padding: 1rem;
    font-size: 0.95rem;

    .form-input-group {
      flex-direction: column;

      input,
      button {
        width: 100%;
        border-radius: 8px;
      }
    }

    .tab {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
