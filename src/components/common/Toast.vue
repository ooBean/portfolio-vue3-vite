<template>
  <transition name="fade" :key="key">
    <div v-if="visible" :class="['toast', type]">
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'

const props = defineProps<{
  message: string
  type?: 'success' | 'error'
  duration?: number
}>()

const visible = ref(false)
const message = ref('')
const type = ref<'success' | 'error'>(props.type || 'success')
const key = ref(0)

watch(() => props.message, (newVal) => {
  if (newVal) {
    message.value = newVal
    visible.value = false
    key.value++  // 递增 key 强制重新渲染
    setTimeout(() => {
      visible.value = true
    }, 10)
    setTimeout(() => {
      visible.value = false
    }, props.duration || 3000)
  }
})

watch(() => props.type, (newVal) => {
  if (newVal) {
    type.value = newVal
  }
})
</script>

<style scoped>
.toast {
  position: fixed;
  top: 40px; /* 改为顶部距离 */
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 24px;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 9999;
  user-select: none;
  pointer-events: none;
  opacity: 0.95;
}
.toast.success {
  background-color: #48bb78;
}
.toast.error {
  background-color: #f56565;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>