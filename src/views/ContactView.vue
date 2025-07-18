<template>
  <section id="contact">
    <h1 class="section-header">Contact</h1>

    <div class="contact-wrapper">
      <form class="form-horizontal" @submit.prevent="handleSubmit">
        <div class="form-group">
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="NAME"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="EMAIL"
            required
          />
        </div>
        <div class="form-group">
          <textarea
            v-model="form.message"
            class="form-control"
            rows="10"
            placeholder="MESSAGE"
            required
          ></textarea>
        </div>
        <button class="btn send-button" type="submit">
          <div class="alt-send-button">
            <img :src="sendIcon" alt="Send" class="send-icon" />
            <span class="send-text">SEND</span>
          </div>
        </button>
      </form>

      <div class="direct-contact-container">
        <ul class="contact-list">
          <li class="list-item">
            <img :src="addressIcon" alt="Address" class="contact-icon-img" />
            <span class="contact-text place">China</span>
          </li>
          <li class="list-item">
            <img :src="phoneIcon" alt="Phone" class="contact-icon-img" />
            <span class="contact-text phone">
              <a href="tel:18797906131">18797906131</a>
            </span>
          </li>
          <li class="list-item">
            <img :src="emailIcon" alt="Email" class="contact-icon-img" />
            <span class="contact-text gmail">
              <a href="mailto:adou77814@gmail.com">adou77814@gmail.com</a>
            </span>
          </li>
        </ul>

        <hr />

        <ul class="social-media-list">
          <li>
            <a
              href="https://github.com/ooPeachBoy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img :src="githubIcon" alt="GitHub" class="contact-icon" />
            </a>
          </li>
          <li class="wechat-item">
            <div class="wechat-wrapper">
              <img :src="wxIcon" alt="WeChat" class="contact-icon" />
              <div class="wechat-qr">
                <img :src="wxQRCode" alt="WeChat QR" />
              </div>
            </div>
          </li>
          <li>
            <a
              href="https://x.com/bean_0_o"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img :src="xIcon" alt="X" class="contact-icon" />
            </a>
          </li>
        </ul>

        <hr />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import wxQRCode from '@/assets/images/wx.jpg'
import addressIcon from '@/assets/icons/address.svg'
import phoneIcon from '@/assets/icons/phone.svg'
import emailIcon from '@/assets/icons/email.svg'
import githubIcon from '@/assets/icons/githubGreen.svg'
import wxIcon from '@/assets/icons/wx.svg'
import xIcon from '@/assets/icons/X.svg'
import sendIcon from '@/assets/icons/send.svg'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

function handleSubmit() {
  console.log('Submitted:', { ...form })
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

/* 基础排版 */
.section-header {
  text-align: center;
  margin: 2.5rem 0;
  font: 300 3.75rem 'Oswald', sans-serif;
  color: #5cb190;
  text-transform: uppercase;
  letter-spacing: 6px;
}
.contact-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  padding: 20px;
}
.form-horizontal {
  max-width: 400px;
  width: 100%;
  font-family: 'Lato', sans-serif;
}
.form-control,
textarea {
  width: 90%;
  max-width: 480px;
  margin: 0 auto 1rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  letter-spacing: 1px;
  color: #fff;
  border: 2px solid #5cb190;
  border-radius: 1rem;
  background: transparent;
}
.send-button {
  width: 90%;
  max-width: 480px;
  margin: 1rem auto 0;
  border: none;
  background: none;
  cursor: pointer;
}
.alt-send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  background: #5cb190;
  border-radius: 0.5rem;
  transition: transform 0.2s ease-in-out;
}
.alt-send-button:hover {
  transform: translateY(-4px);
}
.send-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.send-text {
  font: 700 12px 'Lato', sans-serif;
  letter-spacing: 2px;
  color: #fff;
}

/* 直接联系方式列表 */
.direct-contact-container {
  max-width: 300px;
  width: 100%;
}
.contact-list {
  list-style: none;
  padding: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #bbb;
}
.contact-icon-img {
  width: 24px;
  height: 24px;
  margin-right: 16px;
}
.contact-text {
  font: 300 18px 'Lato', sans-serif;
  letter-spacing: 1.9px;
}
.contact-text a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}
.contact-text a:hover {
  color: #101010;
}

/* 分割线 */
hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 1.5rem 0;
}

/* 社交图标列表 */
.social-media-list {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  gap: 1rem;
}
.social-media-list li {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.social-media-list li:not(.wechat-item) .contact-icon {
  width: 24px;
  height: 24px;
  transition: filter 0.2s, background 0.2s;
}
.social-media-list li:not(.wechat-item):hover {
  background: #fff;
  border-radius: 50%;
}
.social-media-list li:not(.wechat-item):hover .contact-icon {
  filter: brightness(0) invert(1);
}

/* 微信浮层（简化版） */
.wechat-item {
  overflow: visible;
}
.wechat-wrapper {
  position: relative;
}
.wechat-qr {
  display: none;
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 4px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 20;
}
.wechat-qr img {
  display: block;
  max-width: 100%;
  height: auto;
}
.wechat-wrapper:hover .wechat-qr {
  display: block;
}

/* 响应式 */
@media (max-width: 768px) {
  .contact-wrapper {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
