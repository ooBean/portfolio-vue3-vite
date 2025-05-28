// filepath: portfolio-vue3-vite/src/views/ContactView.vue
<template>
  <div class="contact-view">
    <h2>联系我</h2>
    <p>你可以通过以下方式联系我，或者填写下方的表单。</p>
    <ul>
      <li>邮箱: your.email@example.com</li>
      <li>GitHub: <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">yourusername</a></li>
      <li>LinkedIn: <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">Your Profile</a></li>
    </ul>

    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label for="name">姓名:</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div class="form-group">
        <label for="email">邮箱:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="message">内容:</label>
        <textarea id="message" v-model="form.message" rows="5" required></textarea>
      </div>
      <AppButton type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? '发送中...' : '发送消息' }}
      </AppButton>
      <p v-if="submitMessage" :class="{ 'success': !submitError, 'error': submitError }" class="submit-status">
        {{ submitMessage }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppButton from '@/components/common/AppButton.vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});
const isSubmitting = ref(false);
const submitMessage = ref('');
const submitError = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitMessage.value = '';
  submitError.value = false;

  // 模拟表单提交
  try {
    // 在这里你可以调用 services/formService.js 中的方法
    // await formService.submitContactForm(form.value);
    await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟网络延迟
    submitMessage.value = '感谢您的留言，我会尽快回复！';
    form.value = { name: '', email: '', message: '' }; // 清空表单
  } catch (error) {
    console.error('表单提交失败:', error);
    submitMessage.value = '抱歉，消息发送失败，请稍后再试。';
    submitError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-view {
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
}
.contact-view h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}
.contact-view p {
  margin-bottom: 1rem;
  line-height: 1.6;
}
.contact-view ul {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}
.contact-view ul li {
  margin-bottom: 0.5rem;
}

.contact-form {
  background-color: var(--bg-color);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--bg-color);
  color: var(--text-color);
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.3);
}
.submit-status {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
}
.submit-status.success {
  background-color: #e6fffa;
  color: #257963;
  border: 1px solid #b2f5ea;
}
.submit-status.error {
  background-color: #fff5f5;
  color: #c53030;
  border: 1px solid #fc8181;
}
</style>