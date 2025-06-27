<template>
  <div class="todo">
    <form class="todolist-form" @submit.prevent="addItem">
      <div class="form-header">
        <label for="newitem">{{ t('portfolio.todolist.add_item_label') }}</label>
        <BackLink component="todolist" class="top-right-link" />
      </div>
      <div class="form-input-group">
        <input
          v-focus
          type="text"
          id="newitem"
          name="newitem"
          v-model="newitem"
          :placeholder="t('portfolio.todolist.input_placeholder')"
        />
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

      <transition-group name="todolist" tag="ul" class="todolist-items" v-if="filteredTodo.length">
        <li
          v-for="item in filteredTodo"
          :key="item.id"
          class="todolist-item"
          @click="toggleDone(item)"
        >
          <div class="checkbox">
            <input type="checkbox" v-model="item.done" @click.stop />
            <span>{{ item.label }}</span>
          </div>
          <a href="#" class="delete" @click.stop.prevent="removeItem(item.id)"></a>
        </li>
      </transition-group>

      <p v-else class="todolist-empty">{{ t('portfolio.todolist.empty_list') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import BackLink from '@/components/common/BackLink.vue';

// 国际化
const { t } = useI18n();

// 待办事项输入内容
const newitem = ref('');

// 待办事项列表
const todo = ref<Array<{ id: number; label: string; done: boolean }>>([]);

// 筛选状态，默认显示全部
const sortByStatus = ref('all');

const STORAGE_KEY = 'portfolio-todo-items';

// 初始化时尝试从 sessionStorage 恢复保存的待办事项
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

// 数据变化时，同步保存到 sessionStorage
watch(
  todo,
  (newVal) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
  },
  { deep: true }
);

// 根据当前筛选状态筛选待办事项
const filteredTodo = computed(() => {
  if (sortByStatus.value === 'work') {
    return todo.value.filter((item) => !item.done);
  }
  if (sortByStatus.value === 'done') {
    return todo.value.filter((item) => item.done);
  }
  return [...todo.value].sort((a, b) => Number(a.done) - Number(b.done));
});

// 添加新待办项
function addItem() {
  if (newitem.value.trim()) {
    todo.value.push({ id: Date.now(), label: newitem.value.trim(), done: false });
    newitem.value = '';
  }
}

// 切换待办项完成状态
function toggleDone(item: { id: number; done: boolean }) {
  const index = todo.value.findIndex((t) => t.id === item.id);
  if (index !== -1) {
    todo.value[index].done = !todo.value[index].done;
  }
}

// 删除待办项
function removeItem(id: number) {
  todo.value = todo.value.filter((item) => item.id !== id);
}

// 设置筛选状态
function setStatus(status: string) {
  sortByStatus.value = status;
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.todo {
  margin: 2rem;
  padding: 2rem;
  background: var(--chat-bg, $chat-theme-light-bg);
  color: var(--chat-text-color, $chat-theme-light-text-color);
  border-radius: 8px;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
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
    }

    input[type="text"] {
      // More specific selector
      flex-grow: 1;
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
      // More specific selector
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
    margin-top: 2.6rem;
    text-align: center;
    letter-spacing: .05em;
    font-style: italic;
    opacity: 0.8;
    color: inherit;
  }

  .todolist-content {
    margin-top: 2rem;
    padding: 0 1em;
    border: 1px solid var(--todolist-form-input-border);
    border-radius: 4px;
    padding: 1em;

    .tab {
      display: flex;
      justify-content: space-around; // 使用 space-around 使各项间距更均匀
      list-style-type: none; // 去掉 li 的默认项目符号 (点)
      padding: 0; // 移除 ul 的默认内边距
      margin: 0 0 1.5rem 0; // 移除 ul 的默认外边距，并在底部添加一些间距
      border-bottom: 1px solid var(--todolist-form-input-border); // 在整个 tab 栏下方添加一条分割线

      li {
        padding: 0.75rem 1rem; // 为 li 设置内边距，增大点击区域
        cursor: pointer;
        position: relative; // 为 ::after 伪元素定位
        color: var(--todolist-tab-text-color, var(--todolist-text-color)); // 标签文字颜色
        font-size: 0.95rem;
        transition: color 0.2s ease-in-out;
        text-align: center;

        // 下划线伪元素
        &::after {
          content: '';
          position: absolute;
          bottom: -1px; // 将下划线定位在 li 底部 (可调整使其紧贴边框或略微偏移)
          left: 0;
          width: 100%;
          height: 2px; // 下划线厚度
          background-color: var(--todolist-form-button-bg); // 使用您的主题主色
          transform: scaleX(0); // 初始状态下划线宽度为0 (隐藏)
          transform-origin: center; // 从中心扩展动画
          transition: transform 0.25s ease-out; // 过渡动画
        }

        &:hover {
          color: var(--todolist-form-button-bg); // 鼠标悬停时文字颜色变为主题色

          &::after {
            transform: scaleX(1); // 鼠标悬停时显示下划线
          }
        }

        &.active {
          color: var(--todolist-form-button-bg); // active状态的文字颜色
          font-weight: 600; // active状态的文字加粗

          &::after {
            transform: scaleX(1); // active状态下划线保持显示
          }
        }
      }
    }

    .todolist-items {
      list-style: none;
      padding: 0;
      margin: 0;

      .todolist-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        margin: 0.5rem 0;
        border-radius: 4px;
        transition: background-color 0.2s ease, transform 0.1s ease;
        cursor: pointer; // 添加指针样式表明可点击

        &:hover {
          background-color: var(--todolist-item-hover-bg, rgba(0, 0, 0, 0.03));
          transform: translateX(2px);
        }

        .checkbox {
          display: flex;
          align-items: center;
          cursor: pointer;
          flex: 1;
          pointer-events: none; // 防止checkbox区域触发自己的点击事件

          input[type="checkbox"] {
            position: relative;
            width: 20px;
            height: 20px;
            margin-right: 12px;
            cursor: pointer;
            appearance: none;
            border: 2px solid var(--todolist-checkbox-border, #ddd);
            border-radius: 4px;
            transition: all 0.2s ease;
            pointer-events: auto; // 恢复checkbox本身的点击事件

            &:checked {
              background-color: $primary-color;
              border-color: $primary-color;

              &::after {
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
            }

            &:hover {
              border-color: $primary-color;
            }
          }

          span {
            font-size: 1rem;
            transition: color 0.2s ease;
          }
        }

        &:has(input:checked) span {
          color: var(--todolist-text-color-checked, #999);
          text-decoration: line-through;
        }

        .delete {
          opacity: 0;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          position: relative;
          transition: opacity 0.2s ease, background-color 0.2s ease;

          &::before,
          &::after {
            content: '';
            position: absolute;
            width: 2px;
            height: 14px;
            background-color: var(--todolist-delete-color, #666);
            top: 50%;
            left: 50%;
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

        &:hover .delete {
          opacity: 1;
        }
      }
    }
  }
}

// 添加过渡动画
.todolist-move,
.todolist-enter-active,
.todolist-leave-active {
  transition: all 0.5s ease;
}

.todolist-enter-from,
.todolist-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.todolist-leave-active {
  position: absolute;
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
