<template>
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
</template>

<script setup lang="ts" name="Todo">
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUiStore } from '@/store/modules/uiStore';
import BackLink from '@/components/common/BackLink.vue';

const props = defineProps({
  previewMode: { type: Boolean, default: false },
  hideBackLink: { type: Boolean, default: false }
});

const { t } = useI18n();
const uiStore = useUiStore();

const currentTheme = computed(() => uiStore.theme);

// Add explicit type for todo items
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
  if (sortByStatus.value === 'work') {
    return todo.value.filter((item) => !item.done);
  }
  if (sortByStatus.value === 'done') {
    return todo.value.filter((item) => item.done);
  }
  return [...todo.value].sort((a, b) => Number(a.done) - Number(b.done));
});

function addItem() {
  if (newitem.value.trim()) {
    todo.value.push({ id: Date.now(), label: newitem.value.trim(), done: false });
    newitem.value = '';
  }
}

function toggleDone(item: TodoItem) {
  const index = todo.value.findIndex((t) => t.id === item.id);
  if (index !== -1) {
    todo.value[index].done = !todo.value[index].done;
  }
}

function removeItem(id: number) {
  todo.value = todo.value.filter((item) => item.id !== id);
}

function setStatus(status: 'all' | 'work' | 'done') {
  sortByStatus.value = status;
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.todo {
  margin: 1rem !important;
  padding: 1rem !important;
  background-color: var(--todolist-bg, $todolist-theme-light-bg);
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
    /* 限制整体最大宽度为100%，防止溢出 */
    max-width: 100% !important;
    padding: 0.8rem !important;

    .todolist-form {
      width: 100%;
      margin-top: 0.5rem !important;
      display: flex;
      flex-direction: column;

      .form-header {
        flex-direction: column;
      }

      .form-input-group {
        display: flex !important;
        flex-direction: row !important;
        gap: 0.3rem;

        input, button {
          height: 2.8rem !important;
          font-size: 0.9rem !important;
          border-radius: 4px !important;
        }

        input {
          flex-grow: 1;
          min-width: 0;
        }

        button {
          flex-shrink: 0;
          padding: 0 1rem;
        }
      }
    }

    .todolist-content {
      max-width: 100% !important;
      overflow-x: hidden !important;
      padding: 0.5rem 0 !important;
      margin-top: 0.8rem !important;

      .tab {
        margin-bottom: 1rem !important;
      }

      .todolist-items {
        max-height: 160px !important;
        padding-right: 6px !important;
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
    border: 1px solid var(--todolist-form-input-border);
    border-radius: 4px;
    padding: 1em;
    max-height: 280px !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;

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
  padding: 0.5rem 0;
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
