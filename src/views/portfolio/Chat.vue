<template>
  <div class="back-link-wrapper">
    <BackLink component="chat" class="top-right-link" />
  </div>
  <div class="chat">
    <div class="chat-title">
      <h1>{{ t('home.user_name_placeholder') }}</h1>
      <h2>{{ t('home.job') }}</h2>
      <figure class="avatar">
        <img src="@/assets/images/profile-avatar.jpg" />
      </figure>
    </div>
    <div class="messages">
      <div class="messages-content" ref="messagesContent">
        <MessageItem v-for="(message, index) in messageList" :key="index" :message="message" />
      </div>
    </div>
    <div class="message-box">
      <textarea v-model="inputMessage" ref="messageInput" class="message-input" :placeholder="t('portfolio.chat.input_placeholder')"
        @keydown.enter.prevent="sendMessage"></textarea>
      <button class="message-submit" @click="sendMessage">{{ t('portfolio.chat.send_button') }}</button>
    </div>
  </div>

  <div class="bg" :style="{
    background: `url(${getBackgroundImage(currentTheme)}) no-repeat 0 0`,
    backgroundSize: 'cover',
    filter: 'blur(80px)',
    transform: 'scale(1.2)'
  }" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useUiStore } from '@/store/modules/uiStore';
import { useI18n } from 'vue-i18n';
import BackLink from '@/components/common/BackLink.vue';
import MessageItem from '@/components/portfolio-chat/MessageItem.vue';
import type { Language, Theme } from '@/types/unsplash';
const { locale, t } = useI18n();
const uiStore = useUiStore();
const messagesContent = ref<HTMLElement | null>(null)
const inputMessage = ref('')
const messageList = ref<
  { text: string; personal?: boolean; loading?: boolean; timestamp?: string }[]
>([])
const currentTheme = uiStore.theme
const messageInput = ref<HTMLTextAreaElement | null>(null)

onMounted(() => {
  setTimeout(() => {
    fakeMessage()
  }, 100)
  if (messageInput.value) {
    messageInput.value.focus()
  }
})

const messagesMap = {
  'zh-TW': [
    "嗨，我是 Bean！你今天過得如何？",
    "很高興認識你！你也是做技術相關的嗎？",
    "最近你參與了哪些專案？",
    "我最近一直忙著開發一些響應式網頁應用。",
    "你比較喜歡用 Vue 還是 React 這類框架？",
    "我很喜歡解決複雜的介面設計難題。",
    "狀態管理和效能優化真的挺燒腦的！",
    "為了跟上前端快速發展的節奏，我一直在學習新東西。",
    "團隊協作真的很重要，尤其是跨部門配合。",
    "你一般怎麼平衡設計和功能呢？",
    "最近遇到過什麼有趣的技術挑戰嗎？",
    "我還在做幾個兼職專案，時間挺緊的。",
    "希望能不斷提升技能，接受更多挑戰。",
    "好了，我得回去寫程式碼了，改天聊！",
    "和你聊天很愉快！",
    "回頭見，祝你的專案順利！",
    ":)"
  ],
  'zh': [
    "嗨，我是 Bean！你今天怎么样？",
    "很高兴认识你！你也是做技术相关的吗？",
    "最近你参与了哪些项目？",
    "我最近一直忙着开发一些响应式网页应用。",
    "你更喜欢用 Vue 还是 React 这类框架？",
    "我很喜欢解决复杂的界面设计难题。",
    "状态管理和性能优化真的是挺烧脑的！",
    "为了跟上前端快速发展的节奏，我一直在学习新东西。",
    "团队协作真的很重要，尤其是跨部门配合。",
    "你一般怎么平衡设计和功能呢？",
    "最近遇到过什么有意思的技术挑战吗？",
    "我还在做几个兼职项目，时间挺紧的。",
    "希望能不断提升技能，接受更多挑战。",
    "好了，我得回去写代码了，改天聊！",
    "和你聊天很愉快！",
    "回头见，祝你的项目顺利！",
    ":)"
  ],
  'en': [
    "Hey, I’m Bean! How’s your day going?",
    "Nice to meet you! Are you working in tech too?",
    "What kind of projects are you involved with lately?",
    "I’ve been busy building some responsive web apps recently.",
    "Do you prefer working with frameworks like Vue or React?",
    "I really enjoy solving tricky UI challenges.",
    "Managing state and keeping things performant can be quite a puzzle!",
    "I’m always learning new things to keep up with the fast pace of frontend.",
    "Collaboration makes a huge difference, especially across teams.",
    "What’s your approach to balancing design and functionality?",
    "Have you faced any interesting technical challenges recently?",
    "I’m also juggling a couple of freelance gigs on the side.",
    "Looking forward to expanding my skills and taking on new challenges.",
    "Anyway, gotta get back to coding — talk soon!",
    "It’s been great chatting with you!",
    "Catch you later, and good luck with your projects!",
    ":)"
  ]
}
const themeBackgroundMap = {
  'theme-light': 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/blue.avif',
  'theme-dark': 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/dark.avif',
  'theme-warm': 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/warm.avif',
};

const getBackgroundImage = (theme: string): string => {
  return themeBackgroundMap[theme as Theme] || themeBackgroundMap['theme-light'];
}

function getMessage() {
  return messagesMap[locale.value as Language]
}

let i = 0

function getTimestamp(): string {
  const now = new Date()
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
}

function updateScrollbar() {
  if (!messagesContent.value) return
  messagesContent.value.scrollTop = messagesContent.value.scrollHeight
}

function sendMessage() {
  if (!inputMessage.value.trim()) return
  messageList.value.push({
    text: inputMessage.value,
    personal: true,
    timestamp: getTimestamp()
  })
  inputMessage.value = ''
  updateScrollbar()
  setTimeout(() => {
    fakeMessage()
  }, 1000 + Math.random() * 2000)
}

function fakeMessage() {
  if (inputMessage.value !== '') return
  messageList.value.push({
    text: '',
    loading: true
  })
  updateScrollbar()

  setTimeout(() => {
    messageList.value.pop()
    const fakeMessages = getMessage()
    messageList.value.push({
      text: fakeMessages[i],
      timestamp: getTimestamp()
    })
    updateScrollbar()
    i++
  }, 1000 + Math.random() * 2000)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.back-link-wrapper {
  position: absolute;
  top: 100px;
  right: 20px;
  z-index: 10;
}

.top-right-link {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
}

.chat {
  background-color: var(--chat-bg);
  color: var(--chat-text-color);

  .messages {
    background-color: var(--chat-messages-bg);
  }

  .message {
    background-color: var(--chat-other-message-bg);
    color: var(--chat-text-color);

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
  }

  .chat-title {
    border-bottom: 1px solid var(--chat-title-border);
  }

  .message-box {
    background-color: var(--chat-input-bg);

    .message-input {
      color: var(--chat-input-text);
    }

    .message-submit {
      position: absolute;
      z-index: 10;
      top: 9px;
      right: 10px;
      color: var(--chat-button-text-color);
      border: none;
      background-color: var(--chat-accent-color);
      font-size: 12px;
      font-weight: 600;
      text-transform: none;
      line-height: 1;
      padding: 8px 14px;
      border-radius: 16px;
      outline: none !important;
      cursor: pointer;
      transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;

      &:hover {
        background-color: rgba(var(--chat-accent-color-rgb, 86,153,233), 0.85);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        transform: translateY(-2px);
      }
      &:active {
        background-color: rgba(var(--chat-accent-color-rgb, 86,153,233), 0.75);
        box-shadow: none;
        transform: translateY(0);
      }
    }
  }

  &.theme-dark, &[data-theme='theme-dark'] {
    background: rgba(20, 20, 20, 0.85) !important;
    .chat-title {
      background: rgba(40, 40, 40, 0.95) !important;
      color: #f0f0f0 !important;
      border-bottom: 1px solid #555;
    }
  }
}

/*--------------------
Mixins
--------------------*/
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@mixin ball {
  @include center;
  content: '';
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .5);
  z-index: 2;
  margin-top: 4px;
  animation: ball .45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  background: var(--chat-bg);
  background-size: cover;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 1.3;
  overflow: hidden;
}

.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

/*--------------------
Chat Container
--------------------*/
.chat {
  @include center;
  width: 300px;
  height: 80vh;
  max-height: 500px;
  z-index: 2;
  overflow: hidden;
  box-shadow: 0 5px 30px rgba(0, 0, 0, .2);
  background: rgba(0, 0, 0, .5);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

/*--------------------
Chat Title Bar
--------------------*/
.chat-title {
  flex: 0 1 45px;
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  text-transform: uppercase;
  text-align: left;
  padding: 10px 10px 10px 50px;

  h1,
  h2 {
    font-weight: normal;
    font-size: 10px;
    margin: 0;
    padding: 0;
  }

  h2 {
    color: rgba(255, 255, 255, .5);
    font-size: 8px;
    letter-spacing: 1px;
  }

  .avatar {
    position: absolute;
    z-index: 1;
    top: 8px;
    left: 9px;
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
}

/*--------------------
Messages
--------------------*/
.messages {
  flex: 1 1 auto;
  color: rgba(255, 255, 255, .5);
  overflow: hidden;
  position: relative;
  width: 100%;

  .messages-content {
    padding: 0 0.5rem 0 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
    height: 101%;
    width: 100%;
  }

  .message {
    clear: both;
    float: left;
    padding: 6px 10px 7px;
    border-radius: 10px 10px 10px 0;
    background: rgba(0, 0, 0, .3);
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
      border-top: 6px solid rgba(0, 0, 0, .3);
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
      color: #fff;
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
}

/*--------------------
Message Input Box
--------------------*/
.message-box {
  flex: 0 1 40px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  position: relative;

  .message-input {
    background: none;
    border: none;
    outline: none !important;
    resize: none;
    color: rgba(255, 255, 255, .7);
    font-size: 11px;
    height: 17px;
    margin: 0;
    padding-right: 20px;
    width: 265px;
  }

  textarea:focus:-webkit-placeholder {
    color: transparent;
  }

  .message-submit {
    position: absolute;
    z-index: 10;
    top: 9px;
    right: 10px;
    color: var(--chat-button-text-color);
    border: none;
    background-color: var(--chat-accent-color);
    font-size: 12px;
    font-weight: 600;
    text-transform: none;
    line-height: 1;
    padding: 8px 14px;
    border-radius: 16px;
    outline: none !important;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: rgba(var(--chat-accent-color-rgb, 86,153,233), 0.85);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      transform: translateY(-2px);
    }
    &:active {
      background-color: rgba(var(--chat-accent-color-rgb, 86,153,233), 0.75);
      box-shadow: none;
      transform: translateY(0);
    }
  }
}

/*--------------------
Custom Scrollbar (mCustomScrollbar plugin style)
--------------------*/
.mCSB_scrollTools {
  margin: 1px -3px 1px 0;
  opacity: 0;
}

.mCSB_inside>.mCSB_container {
  margin-right: 0px;
  padding: 0 10px;
}

.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

/*--------------------
Animations
--------------------*/
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
