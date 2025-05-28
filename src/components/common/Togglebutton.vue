<template>
  <div class="togglebutton" :class="isactive ? 'togglebutton-checked' : ''">
    <label for="name">
      <span class="togglebutton-label">{{ label }}</span>
      <span class="togglebutton-box"></span>
    </label>
    <input id="name" type="checkbox" name="name" v-model="isactive" @change="onToogle">
  </div>
</template>

<script setup name="Togglebutton">
import { reactive, ref, defineEmits } from "vue"
const emit = defineEmits()
const isactive = ref(false)
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})
function onToogle() {
  emit('clicked', isactive.value)
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.togglebutton {
  margin-top: 1em;

  label {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
  }

  input {
    position: absolute;
    left: -9999px;
  }

  &-label {
    font-size: .8rem;
    letter-spacing: .1em;
    color: var(--toggle-label-color);
    transition: color 0.3s ease;
  }

  &-box {
    position: relative;
    display: block;
    margin-left: 0.6em;
    width: 38px;
    height: 22px;
    background: var(--toggle-box-bg);
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.2s ease;
    border: 1px solid var(--toggle-label-color);
  }

  &-box:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--toggle-circle-bg);
    opacity: 0.9;
    transition: all .2s ease-in-out, background 0.3s ease;
  }

  label:hover .togglebutton-box {
    box-shadow: 0px 0px 0px 3px rgba(var(--toggle-circle-bg-rgb, 0,0,0), 0.2); // 修改这里
  }

  &.togglebutton-checked {
    .togglebutton-box:before {
      left: calc(100% - 2px - 16px);
      background: var(--toggle-circle-checked-bg);
      opacity: 1;
    }
  }
}
</style>
