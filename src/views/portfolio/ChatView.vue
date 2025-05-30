<template>
  <div class="chat-container">
    <div class="header-container">
      <h1 class="chat-title">
        {{ t('portfolio.chat.title') }}
        <span>{{ t('portfolio.chat.subtitle') }}</span>
      </h1>
      <BackLink component="chat" class="top-right-link" />
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <div v-if="messages.length === 0" class="empty-chat">
        {{ t('portfolio.chat.empty') }}
      </div>
      <transition-group name="message" tag="div">
        <div v-for="(message, index) in messages" :key="index"
          :class="['message', message.isOwn ? 'own-message' : 'other-message']">
          <div class="message-header">
            <span class="message-author">{{ message.author }}</span>
            <span class="message-time">{{ formatTime(message.time) }}</span>
          </div>
          <div class="message-content" v-html="formatContent(message.content)"></div>
        </div>
      </transition-group>
    </div>

    <div class="chat-status" :class="connectionStatus">
      <span v-if="isTyping">{{ t('portfolio.chat.status.typing') || '正在输入...' }}</span>
      <span v-else-if="connectionStatus === 'waiting'">{{ t('portfolio.chat.status.waiting') || '正在等待回复...' }}</span>
      <span v-else-if="connectionStatus === 'connected'">{{ t('portfolio.chat.status.connected') }}</span>
      <span v-else-if="connectionStatus === 'connecting'">{{ t('portfolio.chat.status.connecting') }}</span>
      <span v-else-if="connectionStatus === 'disconnected'">{{ t('portfolio.chat.status.disconnected') }}</span>
      <span v-else>{{ t('portfolio.chat.status.error') }}</span>
    </div>

    <form class="chat-form" @submit.prevent="sendMessage">
      <textarea
        v-model="newMessage"
        @input="onInput"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        :placeholder="t('portfolio.chat.input_placeholder')"
        :disabled="connectionStatus === 'connecting' || connectionStatus === 'waiting'"
        rows="1"
        @keydown.enter="onEnter"
        ref="messageInput"
      />
      <button
        type="submit"
        :disabled="!newMessage.trim() || connectionStatus === 'connecting' || connectionStatus === 'waiting'"
      >
        {{ t('portfolio.chat.send_button') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick, watch, computed, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import BackLink from "@/components/common/BackLink.vue"; // 引入BackLink组件
import { safeHtml } from '@/utils/safeHtml';
import { useChatStore } from '@/store/modules/chatStore';
import http from '@/utils/http';

const { t } = useI18n();

// 类型定义
interface ChatMessage {
  author: string;
  content: string;
  time: Date;
  isOwn: boolean;
}

const messagesContainer = ref<HTMLElement | null>(null);
const newMessage = ref('');
const socket = ref<WebSocket | null>(null);
const connectionStatus = ref<'connected' | 'connecting' | 'disconnected' | 'error' | 'waiting'>('disconnected');
const chatStore = useChatStore();
const messages = computed(() => chatStore.messages);
const username = computed(() => chatStore.username);

nextTick(() => {
  if (messageInput.value) {
    messageInput.value.focus();
  }
});

const connectToWebSocket = () => {
  connectionStatus.value = 'connected';
};

const disconnectWebSocket = () => {
  connectionStatus.value = 'disconnected';
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const messageToSend = {
    author: username.value,
    content: newMessage.value,
    time: new Date(),
    isOwn: true
  };
  chatStore.addMessage(messageToSend);
  nextTick(() => scrollToBottom());

  const userContent = newMessage.value;
  newMessage.value = '';
  nextTick(() => autoResize());

  // 设置为等待回复
  connectionStatus.value = 'waiting';

  try {
    const res = await http.post('/chat', { message: userContent });
    chatStore.addMessage({
      author: 'System',
      content: res.data.reply,
      time: new Date(),
      isOwn: false
    });
    connectionStatus.value = 'connected';
  } catch (error) {
    console.log("🚀 ~ sendMessage ~ error:", error)
    chatStore.addMessage({
      author: 'System',
      content: '服务异常，请稍后再试。',
      time: new Date(),
      isOwn: false
    });
    connectionStatus.value = 'error';
  } finally {
    // finally 语句块无论成功还是失败都会执行
    nextTick(() => {
      if (messageInput.value) {
        messageInput.value.focus();
      }
    });
  }
};

const receiveMessage = (message: ChatMessage) => {
  chatStore.addMessage(message);
  scrollToBottom();
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // 秒

  if (diff < 10) return '刚刚';
  if (diff < 60) return `${diff}秒前`;
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;

  // 超过一天，显示日期和时间
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

function formatContent(content: string) {
  return safeHtml(content);
}

const isTyping = ref(false);
let typingTimeout: ReturnType<typeof setTimeout> | null = null;

function handleTyping() {
  if (!isTyping.value) isTyping.value = true;
  if (typingTimeout) clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    isTyping.value = false;
  }, 1000);
}

let isComposing = false;

function onCompositionStart() {
  isComposing = true;
}
function onCompositionEnd() {
  isComposing = false;
  handleTyping();
}
function onInput() {
  autoResize();
  if (!isComposing) {
    handleTyping();
  }
}

// 组件挂载时连接WebSocket
onMounted(() => {
  connectToWebSocket();
});

// 组件卸载时断开WebSocket连接
onUnmounted(() => {
  disconnectWebSocket();
});

// 监听消息变化，自动滚动到底部
watch(messages, () => {
  scrollToBottom();
});

watchEffect(() => {
  messages.value.length;
  scrollToBottom();
});

const messageInput = ref<HTMLTextAreaElement | null>(null);

function onEnter(e: KeyboardEvent) {
  if (!e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize() {
  if (messageInput.value) {
    messageInput.value.style.height = 'auto';
    messageInput.value.style.height = messageInput.value.scrollHeight + 'px';
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.chat-container {
  max-width: 800px;
  margin: 2rem auto;
  background: var(--chat-bg);
  color: var(--chat-text-color);
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
  /* 调整高度以适应固定头尾 */
  overflow-y: auto;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */

  &::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
  }
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  position: relative;
}

.chat-title {
  font-weight: normal;
  font-size: 2rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--chat-title-border);
  margin-bottom: 0;
  color: inherit;
  flex: 1;

  span {
    display: block;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }
}

.top-right-link {
  margin-top: 0.5rem;
  margin-bottom: 0;
  margin-left: 1rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: var(--chat-messages-bg);
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: background 0.3s ease;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */

  &::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
  }

  .empty-chat {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    opacity: 0.7;
    font-style: italic;
  }
}

.message {
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 8px;
  max-width: 80%;
  animation: fade-in 0.3s;
  color: inherit; // Inherits from .chat-container
  box-shadow: var(--chat-message-shadow);
  transition: background 0.3s ease;

  &.other-message {
    background: #f0f1f6; // 浅灰色，代表对方消息
    align-self: flex-start;
    border-bottom-left-radius: 0;
  }

  &.own-message {
    background: #aee1f9; // 浅蓝色，代表自己消息
    align-self: flex-end;
    margin-left: auto;
    border-bottom-right-radius: 0;
  }

  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .message-content {
    word-break: break-word;
  }
}

.message-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.message-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.message-enter-active {
  transition: all 0.3s ease;
}

.chat-status {
  padding: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &.connected {
    background: var(--chat-status-connected-bg);
    color: var(--chat-status-connected-text);
  }

  &.connecting {
    background: var(--chat-status-connecting-bg);
    color: var(--chat-status-connecting-text);
  }

  &.disconnected,
  &.error {
    background: var(--chat-status-disconnected-bg);
    color: var(--chat-status-disconnected-text);
  }

  &.waiting {
    background: var(--chat-status-waiting-bg, #fffbe6);
    color: var(--chat-status-waiting-text, #bfa700);
  }
}

.chat-form {
  display: flex;
  gap: 0.5rem;

  textarea {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid var(--chat-title-border); // Or a specific input border variable
    border-radius: 4px;
    font-family: inherit;
    background: var(--chat-input-bg);
    color: var(--chat-input-text);
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    resize: none; // 禁用手动调整大小
    overflow: hidden; // 隐藏滚动条
    min-height: 2.5em;
    max-height: 8em;
    overflow-y: auto;

    &::placeholder {
      color: currentColor;
      opacity: 0.6;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  button {
    padding: 0.8rem 1.5rem;
    border: none;
    background: var(--chat-accent-color);
    color: var(--chat-button-text-color);
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease, opacity 0.2s ease;

    &:hover:not(:disabled) {
      filter: brightness(90%); // Simple hover effect for CSS var backgrounds
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: $breakpoint-md) {

  // Using SCSS variable from variables.scss
  .chat-container {
    height: auto;
    min-height: 450px;
    margin: 1rem;
    padding: 1rem;
  }

  .message {
    max-width: 90%;
  }

  .chat-title {
    font-size: 1.6rem;

    span {
      font-size: 0.7rem;
    }
  }
}
</style>