import { defineStore } from 'pinia';

export interface ChatMessage {
  author: string;
  content: string;
  time: Date;
  isOwn: boolean;
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as ChatMessage[],
    username: '访客'
  }),
  actions: {
    addMessage(message: ChatMessage) {
      this.messages.push(message);
    },
    clearMessages() {
      this.messages = [];
    },
    setUsername(name: string) {
      this.username = name;
    }
  }
});