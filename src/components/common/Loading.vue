<template>
  <svg class="bar-loader" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
    <rect
      v-for="(x, i) in [5, 36, 67]"
      :key="i"
      :x="x"
      y="10"
      width="18"
      height="20"
      rx="9"
      fill="currentColor"
    >
      <animateTransform
        attributeName="transform"
        type="scale"
        values="1,1; 1,1.8; 1,1"
        :begin="`${i * 0.15}s`"
        dur="0.6s"
        repeatCount="indefinite"
        additive="sum"
      />
    </rect>
  </svg>
</template>

<script setup name="Loading" />
<style scoped>
.bar-loader {
  width: 60px;
  height: 36px;
  display: block;
  color: var(--todolist-form-button-bg); /* 使用主题变量控制 fill */
}
</style>
