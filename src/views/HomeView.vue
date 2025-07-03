<template>
  <div class="home-view">
    <div class="hero-content">
      <div class="hero-text">
        <div class="typewriter-mask-wrap">
          <div class="typewriter-text" :class="{ show: showMaskAnim }">
            <div v-for="(line, lineIdx) in lines" :key="lineIdx" class="typewriter-line">
              <span v-for="(word, i) in line" :key="i" :class="{ highlight: word.highlight }" class="typewriter-word">
                {{ word.text }}
                <span v-if="i !== line.length - 1">&nbsp;</span>
              </span>
            </div>
          </div>
          <p class="framer-text">I am seeking a remote full-time or part-time front-end development role.</p>
          <span class="mask" :class="{ animate: showMaskAnim }"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useI18nStore } from '@/store/modules/i18nStore';

interface Home {
  lines: Array<Array<{ text: string; highlight?: boolean }>>;
}

interface Messages {
  home: Home;
  [key: string]: any;
}

const i18nStore = useI18nStore();
const { locale, getLocaleMessage } = useI18n();

const lines = ref<Array<Array<{ text: string; highlight?: boolean }>>>([]);

function updateLines(lang: string) {
  const messages = getLocaleMessage(lang) as unknown as Messages;
  const rawLines = JSON.parse(JSON.stringify(messages.home?.lines ?? []));
  lines.value = rawLines;
}

// 初始化
updateLines(i18nStore.currentLang);

// 监听 store 中的 currentLang 变化，更新 lines
watch(
  () => i18nStore.currentLang,
  (newLang) => {
    updateLines(newLang);
  }
);

const showMaskAnim = ref(false);

onMounted(() => {
  setTimeout(() => {
    showMaskAnim.value = true;
  }, 300);
});
</script>

<style scoped lang="scss">
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 只用flex居中，不设置min-height或height: 100vh，避免溢出 */
  width: 100%;
  background: $hero-bg-color;
  flex: 1 0 auto;
  min-height: calc(100vh - 64px - 48px);
}

.hero-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;
}

.hero-text {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 不设置height/min-height */
  padding: 2vw 0;
}

.typewriter-mask-wrap {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  width: 100%;
}

.typewriter-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 居中每一行 */
  font-family: 'Georgia', serif;
  font-size: clamp(2.2rem, 6vw, 4rem);
  color: $hero-heading-color;
  line-height: 1.1;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 1.2s cubic-bezier(.4, 0, .2, 1), transform 1.2s cubic-bezier(.4, 0, .2, 1); // 缩短时长
  width: 100%;
}

.typewriter-text.show {
  opacity: 1;
  transform: translateY(0);
}

.typewriter-line {
  width: 100%;
  display: flex;
  justify-content: center;
  /* 居中每一行的内容 */
  margin-bottom: 0.1em;
  flex-wrap: wrap;
}

.typewriter-word {
  display: inline-block;
  /* 保证空格不会被折叠 */
  white-space: pre;
}

.typewriter-text .highlight {
  color: #aaaaaa;
}

.typewriter-mask-wrap .mask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: $hero-bg-color;
  z-index: 2;
  transition: transform 1s cubic-bezier(.77, 0, .175, 1); // 缩短时长
  transform: translateX(0);
  pointer-events: none;
}

.typewriter-mask-wrap .mask.animate {
  transform: translateX(102%);
}

.framer-text {
  color: rgba(25, 25, 25, 0.7);
  text-align: center;
  width: 100%;
  margin-top: 2rem;
  font-size: 1.2rem;
}

@media (max-width: 600px) {
  .typewriter-text {
    font-size: clamp(1.2rem, 7vw, 2.2rem);
  }
}
</style>