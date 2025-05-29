<template>
  <div class="todolist-container">
    <!-- 使用抽象出来的BackLink组件 -->
    <BackLink component="todolist" />
    
    <h1 class="todolist-title">
      {{ t('portfolio.todolist.title') }}
      <span>{{ t('portfolio.todolist.subtitle') }}</span>
    </h1>

    <template v-if="todo.length">
      <transition-group name="todolist" tag="ul" class="todolist-items">
        <li v-for="item in todoByStatus" :class="['todolist-item', { 'done': item.done }]" :key="item.id">
          <span class="label">{{ item.label }}</span>
          <div class="actions">
            <button class="btn-action" type="button" @click="markAsDoneOrUndone(item)"
              :aria-label="item.done ? t('portfolio.todolist.mark_as_undone') : t('portfolio.todolist.mark_as_done')" 
              :title="item.done ? t('portfolio.todolist.mark_as_undone') : t('portfolio.todolist.mark_as_done')">
              <i aria-hidden="true" class="material-icons">
                {{ item.done ? 'check_box' : 'check_box_outline_blank' }}
              </i>
            </button>
            <button class="btn-action" type="button" @click="deleteItemFromList(item)" 
              :aria-label="t('portfolio.todolist.delete')" :title="t('portfolio.todolist.delete')">
              <i aria-hidden="true" class="material-icons">delete</i>
            </button>
          </div>
        </li>
      </transition-group>
      <Togglebutton :label="toggleLabel" :name="t('portfolio.todolist.title')" @clicked="clickontoogle" />
    </template>
    <p v-else class="todolist-empty">{{ t('portfolio.todolist.empty_list') }}</p>

    <form class="todolist-form" name="newform" @submit.prevent="addItem">
      <label for="newitem">{{ t('portfolio.todolist.add_item_label') }}</label>
      <div class="form-input-group">
        <input type="text" name="newitem" id="newitem" v-model="newitem">
        <button type="submit">{{ t('portfolio.todolist.add_item_button') }}</button>
      </div>
    </form>
  </div>
</template>

<script setup name="TodoListView">
import { reactive, ref, computed, watch } from "vue"
import Togglebutton from "@/components/common/Togglebutton.vue";
import BackLink from "@/components/common/BackLink.vue"; // 引入BackLink组件
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const toggleLabel = computed(() => t('portfolio.todolist.sort_toggle'));

// 使用国际化字符串初始化待办事项
let todo = reactive([
  { id: 1, label: t('portfolio.todolist.items.learn_vue'), done: true },
  { id: 2, label: t('portfolio.todolist.items.code_todolist'), done: false },
  { id: 3, label: t('portfolio.todolist.items.learn_more'), done: false }
]);

// 监听语言变化，更新初始待办事项标签
watch(locale, () => {
  if (todo.length >= 3) {
    todo[0].label = t('portfolio.todolist.items.learn_vue');
    todo[1].label = t('portfolio.todolist.items.code_todolist');
    todo[2].label = t('portfolio.todolist.items.learn_more');
  }
});

let newitem = ref("")
let sortByStatus = ref(false)

function addItem() {
  if (newitem.value.trim()) {
    todo.push({ id: Math.floor(Math.random() * 9999) + 10, label: newitem.value, done: false });
    newitem.value = '';
  }
}

function markAsDoneOrUndone(item) {
  item.done = !item.done;
}

function deleteItemFromList(item) {
  todo.splice(todo.indexOf(item), 1);
}

function clickontoogle(active) {
  sortByStatus.value = active;
}

const todoByStatus = computed(() => {
  if (sortByStatus.value) {
    return [...todo].sort((a, b) => a.done - b.done);
  }
  return todo;
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

// 动画效果 (no change)
@keyframes strikeitem {
  to { width: calc(100% + 1rem); }
}

// 主容器
.todolist-container {
  margin: 2rem auto;
  padding: 1rem 3rem 3rem;
  max-width: 500px;
  background: var(--todolist-bg);
  color: var(--todolist-text-color);
  border-radius: 8px;
  transition: background 0.3s ease, color 0.3s ease;
}

// 标题样式
.todolist-title {
  font-weight: normal;
  font-size: 2.6rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--todolist-title-border);
  color: inherit; // Inherits from .todolist-container
  transition: border-color 0.3s ease;
  
  span {
    display: block;
    font-size: 0.8rem;
    margin-bottom: 0.7rem;
    margin-left: 3px;
    margin-top: 0.2rem;
    opacity: 0.8;
  }
}

// 空列表提示
.todolist-empty {
  margin-top: 2.6rem;
  text-align: center;
  letter-spacing: .05em;
  font-style: italic;
  opacity: 0.8;
  color: inherit;
}

// 列表样式
.todolist-items {
  margin-top: 2.6rem;
  list-style: none;
}

// 列表项动画 (no change)
.todolist-move {
  transition: transform 1s;
}

// 列表项样式
.todolist-item {
  display: flex;
  margin: 0 -3rem 4px;
  padding: 1.1rem 3rem;
  justify-content: space-between;
  align-items: center;
  background: var(--todolist-item-bg);
  color: inherit;
  transition: background 0.3s ease;
  
  .label {
    position: relative;
    transition: opacity .2s linear;
  }
  
  .actions {
    flex-shrink: 0;
    padding-left: 0.7em;
  }
  
  // 已完成项样式
  &.done .label {
    opacity: .6;
    
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: -.5rem;
      display: block;
      width: 0%;
      height: 1px;
      background: var(--todolist-item-done-strike);
      animation: strikeitem .3s ease-out 0s forwards;
      transition: background 0.3s ease;
    }
  }
}

// 按钮样式
.btn-action {
  border: none;
  background: none;
  -webkit-appearance: none;
  cursor: pointer;
  color: var(--todolist-action-btn-color);
  transition: opacity 0.2s ease, color 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
}

// 表单样式
.todolist-form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  
  label {
    margin-bottom: .5rem;
    font-size: 1.3rem;
    color: inherit;
  }
  
  .form-input-group {
    display: flex;
  }
  
  input[type="text"] { // More specific selector
    flex-grow: 1;
    border: 1px solid var(--todolist-form-input-border);
    background: var(--todolist-form-input-bg);
    color: var(--todolist-form-input-text);
    padding: 0 1.5em;
    font-size: initial;
    height: 3rem;
    border-radius: 4px 0 0 4px;
    font-family: 'Quicksand', sans-serif;
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }
  
  button[type="submit"] { // More specific selector
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
</style>
