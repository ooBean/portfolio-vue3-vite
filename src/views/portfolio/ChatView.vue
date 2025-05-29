<template>
  <div class="chat-container">
    <!-- 使用抽象出来的BackLink组件 -->
    <BackLink component="chat" />
    
    <h1 class="chat-title">
      {{ t('portfolio.chat.title') }}
      <span>{{ t('portfolio.chat.subtitle') }}</span>
    </h1>
    
    <div class="chat-messages" ref="messagesContainer">
      <div v-if="messages.length === 0" class="empty-chat">
        {{ t('portfolio.chat.empty') }}
      </div>
      <transition-group name="message" tag="div">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          :class="['message', message.isOwn ? 'own-message' : 'other-message']"
        >
          <div class="message-header">
            <span class="message-author">{{ message.author }}</span>
            <span class="message-time">{{ formatTime(message.time) }}</span>
          </div>
          <div class="message-content">{{ message.content }}</div>
        </div>
      </transition-group>
    </div>

    <div class="chat-status" :class="connectionStatus">
      <span v-if="connectionStatus === 'connected'">{{ t('portfolio.chat.status.connected') }}</span>
      <span v-else-if="connectionStatus === 'connecting'">{{ t('portfolio.chat.status.connecting') }}</span>
      <span v-else-if="connectionStatus === 'disconnected'">{{ t('portfolio.chat.status.disconnected') }}</span>
      <span v-else>{{ t('portfolio.chat.status.error') }}</span>
    </div>

    <form class="chat-form" @submit.prevent="sendMessage">
      <input 
        type="text" 
        v-model="newMessage" 
        :placeholder="t('portfolio.chat.input_placeholder')"
        :disabled="connectionStatus !== 'connected'"
      />
      <button 
        type="submit" 
        :disabled="!newMessage.trim() || connectionStatus !== 'connected'"
      >
        {{ t('portfolio.chat.send_button') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import BackLink from "@/components/common/BackLink.vue"; // 引入BackLink组件

const { t } = useI18n();

// 类型定义
interface ChatMessage {
  author: string;
  content: string;
  time: Date;
  isOwn: boolean;
}

const messagesContainer = ref<HTMLElement | null>(null);
const messages = reactive<ChatMessage[]>([]);
const newMessage = ref('');
const socket = ref<WebSocket | null>(null);
const connectionStatus = ref('disconnected'); // connected, connecting, disconnected, error
const username = ref(t('portfolio.chat.default_username'));

// 这些消息是静态演示用，在真实实现中会被WebSocket消息替代
const demoMessages = [
  { author: 'Alice', content: t('portfolio.chat.demo_messages.welcome'), time: new Date(), isOwn: false },
  { author: 'Bob', content: t('portfolio.chat.demo_messages.greeting'), time: new Date(), isOwn: false }
];

const connectToWebSocket = () => {
  connectionStatus.value = 'connecting';
  
  // 在实际项目中，替换为真实的WebSocket服务器地址
  // socket.value = new WebSocket('wss://your-websocket-server.com/chat');
  
  // 模拟连接成功
  setTimeout(() => {
    connectionStatus.value = 'connected';
    
    // 添加演示消息
    setTimeout(() => {
      messages.push(...demoMessages);
      // 模拟收到新消息
      setTimeout(() => {
        receiveMessage({
          author: 'System',
          content: t('portfolio.chat.demo_messages.question'),
          time: new Date(),
          isOwn: false
        });
      }, 1500);
    }, 800);
  }, 1000);
  
  /* 真实WebSocket连接的代码会是这样：
  socket.value.onopen = () => {
    connectionStatus.value = 'connected';
  };
  
  socket.value.onmessage = (event) => {
    const data = JSON.parse(event.data);
    receiveMessage({
      author: data.author,
      content: data.content,
      time: new Date(data.time),
      isOwn: false
    });
  };
  
  socket.value.onclose = () => {
    connectionStatus.value = 'disconnected';
  };
  
  socket.value.onerror = () => {
    connectionStatus.value = 'error';
  };
  */
};

const disconnectWebSocket = () => {
  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    socket.value.close();
  }
  connectionStatus.value = 'disconnected';
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  const messageToSend = {
    author: username.value,
    content: newMessage.value,
    time: new Date(),
    isOwn: true
  };
  
  // 在实际项目中，这里会通过WebSocket发送消息
  // if (socket.value && socket.value.readyState === WebSocket.OPEN) {
  //   socket.value.send(JSON.stringify({
  //     author: username.value,
  //     content: newMessage.value
  //   }));
  // }
  
  // 将自己的消息添加到列表
  messages.push(messageToSend);
  newMessage.value = '';
  
  // 模拟收到回复
  setTimeout(() => {
    receiveMessage({
      author: 'System',
      content: t('portfolio.chat.demo_messages.reply'),
      time: new Date(),
      isOwn: false
    });
  }, 1000);
};

const receiveMessage = (message: ChatMessage) => {
  messages.push(message);
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
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

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
  height: 600px; // Consider making this responsive or dynamic
  transition: background 0.3s ease, color 0.3s ease;
}

.chat-title {
  font-weight: normal;
  font-size: 2rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--chat-title-border);
  margin-bottom: 1rem;
  color: inherit; // Inherits from .chat-container

  span {
    display: block;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: var(--chat-messages-bg);
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: background 0.3s ease;

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
    background: var(--chat-other-message-bg);
    align-self: flex-start;
    border-bottom-left-radius: 0;
  }

  &.own-message {
    background: var(--chat-own-message-bg);
    align-self: flex-end;
    margin-left: auto;
    border-bottom-right-radius: 0;
    // If own message text needs specific color for contrast:
    // color: var(--chat-own-message-text-color, inherit);
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
  &.disconnected, &.error {
    background: var(--chat-status-disconnected-bg);
    color: var(--chat-status-disconnected-text);
  }
}

.chat-form {
  display: flex;
  gap: 0.5rem;

  input[type="text"] {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid var(--chat-title-border); // Or a specific input border variable
    border-radius: 4px;
    font-family: inherit;
    background: var(--chat-input-bg);
    color: var(--chat-input-text);
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;

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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: $breakpoint-md) { // Using SCSS variable from variables.scss
  .chat-container {
    height: auto;
    min-height: 450px;
    margin: 1rem;
    padding: 1rem;
  }
  .message { max-width: 90%; }
  .chat-title {
    font-size: 1.6rem;
    span { font-size: 0.7rem; }
  }
}
</style>