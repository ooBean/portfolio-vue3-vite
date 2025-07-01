<template>
  <div :class="['message', message.personal ? 'message-personal' : '', message.loading ? 'loading' : '', 'new']">
    <figure v-if="!message.personal" class="avatar">
      <img src="@/assets/images/profile-avatar.jpg" />
    </figure>
    <span v-if="message.loading"></span>
    <div v-else>{{ message.text }}</div>
    <div class="timestamp" v-if="message.timestamp">{{ message.timestamp }}</div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{ message: { text: string; personal?: boolean; loading?: boolean; timestamp?: string } }>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

@mixin ball {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .5);
  z-index: 2;
  margin-top: 4px;
  animation: ball .45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
  transform: translate(-50%, -50%);
}

.message {
  clear: both;
  float: left;
  padding: 6px 10px 7px;
  border-radius: 10px 10px 10px 0;
  background: var(--chat-other-message-bg);
  color: var(--chat-text-color);
  margin: 8px 0;
  font-size: 11px;
  line-height: 1.4;
  margin-left: 35px;
  position: relative;
  text-shadow: 0 1px 1px rgba(0, 0, 0, .2);

  .timestamp {
    position: absolute;
    bottom: -15px;
    font-size: 9px;
    color: rgba(255, 255, 255, .3);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -6px;
    border-top: 6px solid var(--chat-other-message-bg);
    left: 0;
    border-right: 7px solid transparent;
  }

  .avatar {
    position: absolute;
    z-index: 1;
    bottom: -15px;
    left: -35px;
    border-radius: 30px;
    width: 30px;
    height: 30px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 2px solid rgba(255, 255, 255, 0.24);

    img {
      width: 100%;
      height: auto;
    }
  }

  &.message-personal {
    float: right;
    color: var(--chat-button-text-color);
    text-align: right;
    background: linear-gradient(120deg, var(--primary-color-start, #5699e9), var(--primary-color-end, #257287));
    border-radius: 10px 10px 0 10px;

    &::before {
      left: auto;
      right: 0;
      border-right: none;
      border-left: 5px solid transparent;
      border-top: 4px solid var(--primary-color-end, #257287);
      bottom: -4px;
    }
  }

  &:last-child {
    margin-bottom: 30px;
  }

  &.new {
    transform: scale(0);
    transform-origin: 0 0;
    animation: bounce 500ms linear both;
  }

  &.loading {
    &::before {
      content: '';
      @include ball;
      border: none;
      animation-delay: .15s;
    }

    span {
      display: block;
      font-size: 0;
      width: 20px;
      height: 10px;
      position: relative;

      &::before {
        @include ball;
        margin-left: -7px;
      }

      &::after {
        @include ball;
        margin-left: 7px;
        animation-delay: .3s;
      }
    }
  }
}

@keyframes bounce {
  0% {
    transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  4.7% {
    transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  9.41% {
    transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  14.11% {
    transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  18.72% {
    transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  24.32% {
    transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  29.93% {
    transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  35.54% {
    transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  41.04% {
    transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  52.15% {
    transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  63.26% {
    transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  85.49% {
    transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}

@keyframes ball {
  from {
    transform: translateY(0) scaleY(.8);
  }

  to {
    transform: translateY(-10px);
  }
}
</style>
