<template>
  <div class="about-container">
    <!-- 背景几何图形 -->
    <div class="bg-shapes">
      <div v-for="shape in bgShapes" :key="shape.id" :class="['shape', shape.class]" :style="shape.style"></div>
    </div>

    <div class="floating-icons left">
      <div v-for="icon in leftIcons" :key="icon.id" class="icon-rotate" :style="icon.style" :title="icon.alt">
        <div class="icon-wrapper">
          <img :src="icon.src" :alt="icon.alt" />
        </div>
      </div>
    </div>

    <div class="content" ref="contentRef">
      <!-- 只当滚动容器 -->
      <div class="content-text">
        <h1>Web Developer</h1>
        <p>Creating digital experiences that matter</p>
        <div class="about-text">
          <template v-for="(item, idx) in about" :key="idx">
            <p v-if="idx !== 2">{{ item }}</p>
            <p v-else>
              <a
                :href="item"
                target="_blank"
                rel="noopener noreferrer"
                class="about-link"
              >{{ item }}</a>
            </p>
          </template>
        </div>
      </div>
    </div>

    <div class="floating-icons right">
      <div v-for="icon in rightIcons" :key="icon.id" class="icon-rotate" :style="icon.style" :title="icon.alt">
        <div class="icon-wrapper">
          <img :src="icon.src" :alt="icon.alt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'

// 统一引入所有SVG图标
import anquanIcon from '@/assets/icons/anquan.svg';
import bootstrapIcon from '@/assets/icons/Bootstrap.svg';
import cssIcon from '@/assets/icons/css.svg';
import gameIcon from '@/assets/icons/Game.svg';
import gitIcon from '@/assets/icons/git.svg';
import githubIcon from '@/assets/icons/github.svg';
import htmlIcon from '@/assets/icons/html.svg';
import javascriptIcon from '@/assets/icons/JavaScript.svg';
import Echarts from '@/assets/icons/Echarts.svg';
import ElementUI from '@/assets/icons/ElementUI.svg';
import lessIcon from '@/assets/icons/less.svg';
import reactIcon from '@/assets/icons/react.svg';
import miniProgramIcon from '@/assets/icons/miniProgram.svg';
import scssIcon from '@/assets/icons/scss.svg';
import securityIcon from '@/assets/icons/security.svg';
import tailwindcssIcon from '@/assets/icons/tailwindcss.svg';
import typescriptIcon from '@/assets/icons/typescript.svg';
import vueIcon from '@/assets/icons/vue.svg';
import webCodingIcon from '@/assets/icons/webCoding.svg';
import { useI18n } from 'vue-i18n';
import type { Language } from '@/types/unsplash';

const { locale } = useI18n()

const aboutTexts = {
  zh_CN: [
    "拥有 5 年前端开发经验，精通 Vue、React、TypeScript 等技术栈，具备从 PC、移动端到平板端的全平台开发能力。为拓展全球化合作机会，现专注于远程与线上开发模式。",
    "近期参与银行业务相关项目，涵盖 iPad、移动端及 PC 端开发，重点关注安全性、性能优化与用户体验。出于保密要求，部分作品无法公开展示，可通过以下链接访问早期线上项目：",
    "https://codesign.qq.com/",
    "生活与时间安排稳定，可持续高效投入高质量开发与协作工作。"
  ],
  zh_TW: [
    "擁有 5 年前端開發經驗，精通 Vue、React、TypeScript 等技術棧，具備從 PC、行動端到平板端的全平台開發能力。為拓展全球化合作機會，現專注於遠端與線上開發模式。",
    "近期參與銀行業務相關專案，涵蓋 iPad、行動端及 PC 端開發，重點關注安全性、效能優化與使用者體驗。出於保密要求，部分作品無法公開展示，可透過以下連結訪問早期線上專案：",
    "https://codesign.qq.com/",
    "生活與時間安排穩定，可持續高效投入高品質開發與協作工作。"
  ],
  en: [
    "With 5 years of front-end development experience, proficient in Vue, React, and TypeScript, I am skilled in full-platform development covering PC, mobile, and tablet devices. To expand global collaboration opportunities, I am now focusing on remote and online development.",
    "Recently involved in banking-related projects, including iPad, mobile, and PC development, with a strong emphasis on security, performance optimization, and user experience. Due to confidentiality requirements, some works cannot be publicly showcased, but you can view an earlier online project via the following link:",
    "https://codesign.qq.com/",
    "Stable lifestyle and flexible schedule, enabling me to dedicate myself fully to delivering high-quality development and collaboration."
  ]
}

// 根据 locale 动态选取段落数组
const about = computed(() => {
  if (locale.value === 'en')     return aboutTexts.en
  if (locale.value === 'zh-TW')  return aboutTexts.zh_TW
  return aboutTexts.zh_CN
})

// 增加 content 容器引用
const contentRef = ref<HTMLElement | null>(null)

/**
 * 平滑滚动内容，从顶部(0)滚到底部
 * @param duration 动画时长，单位毫秒
 */
function smoothScrollToBottom(duration = 15000) {
  const el = contentRef.value
  if (!el) return
  const container: HTMLElement = el

  // 用于取消动画
  let animationFrameId: number;

  // 定义中断处理函数
  const interruptHandler = () => {
    // 取消动画帧的请求
    cancelAnimationFrame(animationFrameId);
    // 移除事件监听，避免内存泄漏
    container.removeEventListener('wheel', interruptHandler);
    container.removeEventListener('touchstart', interruptHandler);
  };

  // 添加事件监听器，当用户尝试滚动时中断动画
  // { passive: true } 是一种优化，告诉浏览器该监听器不会调用 preventDefault()
  container.addEventListener('wheel', interruptHandler, { passive: true });
  container.addEventListener('touchstart', interruptHandler, { passive: true });

  // 强制重置到顶部
  container.scrollTop = 0

  const start     = 0
  const end       = container.scrollHeight
  const change    = end - start
  const startTime = performance.now()

  function animate(time: number) {
    const elapsed  = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased    = progress // 线性过渡

    container.scrollTop = start + change * eased
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      // 动画自然结束后，也要移除监听器
      container.removeEventListener('wheel', interruptHandler);
      container.removeEventListener('touchstart', interruptHandler);
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  smoothScrollToBottom(15000)
})

// 语言切换后，DOM 更新完毕再滚一次
watch(locale, async () => {
  await nextTick()
  smoothScrollToBottom(15000)
})

const leftIcons = [
  { id: 1, src: anquanIcon, alt: 'anquan', style: { top: '10%', left: '10%', '--delay': '0s' } },
  { id: 2, src: cssIcon, alt: 'CSS', style: { top: '25%', left: '15%', '--delay': '0.5s' } },
  { id: 3, src: gameIcon, alt: 'Game', style: { top: '45%', left: '10%', '--delay': '1s' } },
  { id: 4, src: htmlIcon, alt: 'HTML', style: { top: '65%', left: '20%', '--delay': '1.5s' } },
  { id: 5, src: javascriptIcon, alt: 'JavaScript', style: { top: '35%', left: '28%', '--delay': '2s' } },
  { id: 13, src: tailwindcssIcon, alt: 'TailwindCSS', style: { top: '50%', left: '30%', '--delay': '3s' } },
  { id: 14, src: securityIcon, alt: 'Security', style: { top: '75%', left: '12%', '--delay': '3.5s' } },
  { id: 12, src: gitIcon, alt: 'Git', style: { top: '55%', left: '45%', '--delay': '2.5s' } },
  { id: 13, src: githubIcon, alt: 'GitHub', style: { top: '70%', left: '52%', '--delay': '3s' } },
];

const rightIcons = [
  { id: 6, src: lessIcon, alt: 'Less', style: { top: '8%', left: '50%', '--delay': '0.5s' } },
  { id: 7, src: reactIcon, alt: 'React', style: { top: '20%', left: '58%', '--delay': '1s' } },
  { id: 8, src: scssIcon, alt: 'SCSS', style: { top: '85%', left: '45%', '--delay': '1.5s' } },
  { id: 9, src: typescriptIcon, alt: 'TypeScript', style: { top: '45%', left: '42%', '--delay': '2s' } },
  { id: 10, src: vueIcon, alt: 'Vue', style: { top: '70%', left: '88%', '--delay': '0.5s' } },
  { id: 11, src: webCodingIcon, alt: 'WebCoding', style: { top: '60%', left: '75%', '--delay': '1.5s' } },
  { id: 15, src: bootstrapIcon, alt: 'Bootstrap', style: { top: '50%', left: '82%', '--delay': '2s' } },
  { id: 16, src: Echarts, alt: 'ECharts', style: { top: '85%', left: '60%', '--delay': '2.5s' } },
  { id: 17, src: ElementUI, alt: 'ElementUI', style: { top: '18%', left: '80%', '--delay': '3s' } },
  // 新增：小程序图标，居中偏下位置
  { id: 18, src: miniProgramIcon, alt: 'Mini Program', style: { top: '60%', left: '50%', '--delay': '3.5s' } },
];

// 调整后：左右两侧各分布三个几何图形
const bgShapes = [
  // 左侧：圆形
  {
    id: 1,
    class: 'circle',
    style: {
      top: '14%',
      left: '22%',
      width: '180px',
      height: '180px',
      '--rotate-duration': '60s'
    }
  },
  // 左侧：正方形
  {
    id: 2,
    class: 'square',
    style: {
      top: '80%',
      left: '12%',
      width: '100px',
      height: '100px',
      '--rotate-duration': '45s'
    }
  },
  // 左侧：菱形
  {
    id: 3,
    class: 'diamond',
    style: {
      top: '60%',
      left: '8%',
      width: '80px',
      height: '80px',
      '--rotate-duration': '50s'
    }
  },
  // 右侧：三角形
  {
    id: 4,
    class: 'triangle',
    style: {
      top: '25%',
      left: '85%',
      width: '0',
      height: '0',
      '--side': '60px',
      '--rotate-duration': '40s'
    }
  },
  // 右侧：六边形
  {
    id: 5,
    class: 'hexagon',
    style: {
      top: '75%',
      left: '80%',
      width: '120px',
      height: '120px',
      '--rotate-duration': '70s'
    }
  },
  // 右侧：小圆
  {
    id: 6,
    class: 'circle',
    style: {
      top: '6%',
      left: '68%',
      width: '70px',
      height: '70px',
      '--rotate-duration': '90s'
    }
  },
  // 新增：等腰三角形
  {
    id: 7,
    class: 'isosceles',
    style: {
      top: '50%',
      left: '30%',
      width: '0',
      height: '0',
      '--base': '80px',
      '--height': '120px',
      '--rotate-duration': '65s'
    }
  }
]
</script>

<style scoped lang="scss">
.about-container {
  position: relative;
  height: 80vh;
  background-color: var(--background-color);
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-align: center;
  padding: 0 1rem;
  gap: 2rem;

  /* 主题配色变量 */
  --shape-fill: rgba(59, 130, 246, 0.08);
  --shape-stroke: rgba(59, 130, 246, 0.2);
  --gradient-start: rgba(59, 130, 246, 0.12);
  --gradient-end: rgba(59, 130, 246, 0);

  // 自定义一个可调偏移量
  --content-shift: 0; /* 从 10vh 改为 0，使其上移至垂直居中位置 */
}

/* 背景几何体容器 */
.bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* 保留这个在背景上 */
  z-index: 0;
}

/* 通用自转动画 */
.shape {
  position: absolute;
  transform-origin: center center;
  animation: shapeRotate var(--rotate-duration) linear infinite;
}

/* 优化圆形：去掉过于模糊的径向渐变，改为半透明实色＋描边 */
.shape.gradient-circle {
  width: inherit;
  height: inherit;
  background: var(--shape-fill); // 半透明填充
  border: 2px solid var(--shape-stroke); // 清晰可见的描边
  border-radius: 50%;
}

/* 方块 */
.shape.square {
  width: inherit;
  height: inherit;
  background: var(--shape-fill);
  border: 1px solid var(--shape-stroke);
  border-radius: 6px;
}

/* 菱形（45°旋转正方形） */
.shape.diamond {
  width: inherit;
  height: inherit;
  background: var(--shape-fill);
  border: 1px solid var(--shape-stroke);
  transform: rotate(45deg);
}

/* 三角形 */
.shape.triangle {
  width: 0;
  height: 0;
  border-left: var(--side) solid transparent;
  border-right: var(--side) solid transparent;
  border-bottom: calc(var(--side) * 1.2) solid var(--shape-fill);
  box-shadow: inset 0 0 0 1px var(--shape-stroke);
}

/* 六边形 */
.shape.hexagon {
  width: inherit;
  height: inherit;
  background: var(--shape-fill);
  border: 1px solid var(--shape-stroke);
  clip-path: polygon(25% 6.7%,
      75% 6.7%,
      100% 50%,
      75% 93.3%,
      25% 93.3%,
      0% 50%);
}

@keyframes shapeRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* 让图标和文字保持在最上层 */
.floating-icons {
  position: relative;
  z-index: 10;
}

.content {
  position: relative;
  z-index: 11; /* 确保内容框在图标之上 */
}

.floating-icons.left,
.floating-icons.right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 45%;
  pointer-events: auto;
  /* 保证这些图标区域能响应鼠标事件 */
}

.floating-icons.left {
  left: 0;
}

.floating-icons.right {
  right: 0;
}

.icon-rotate {
  position: absolute;
  /* inherited top/left from icon.style */
  width: 48px;
  height: 48px;
  animation: floatRotate 20s linear var(--delay) infinite;
}

.icon-wrapper {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  animation:
    floatUpDown 4s ease-in-out var(--delay) infinite,
    floatDrift 6s ease-in-out var(--delay) infinite;

  /* 添加小手指针效果 */
  cursor: pointer;
}

.icon-wrapper img {
  width: 28px;
  height: 28px;
  user-select: none;
  pointer-events: none;
}

@keyframes floatRotate {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

@keyframes floatUpDown {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes floatDrift {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  25% {
    transform: translate(5px, -5px) scale(1.1);
  }

  50% {
    transform: translate(0, 8px) scale(0.9);
  }

  75% {
    transform: translate(-5px, -3px) scale(1);
  }
}

.content {
  max-width: 380px; // 增加最大宽度
  padding: 1.5rem; // 内边距
  height: 400px;
  background: rgba(255, 255, 255, 0.6);
  border: 2px dashed var(--shape-stroke);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  transform: translateY(var(--content-shift));

  /* 隐藏滚动条，但仍允许内容滚动 */
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;     /* Firefox */
}
.content::-webkit-scrollbar {
  display: none;             /* Chrome, Safari, Opera */
}

.content-text {
  background: none; // 取消渐变剪裁
  -webkit-background-clip: initial;
  -webkit-text-fill-color: inherit;
  text-align: left; // 左对齐更易阅读

  h1 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #f6d365, #fda085);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  .about-text {
    font-size: 0.95rem;
    line-height: 1.8; // 略微加大行间距
    white-space: pre-wrap;
  }

}

// 可选：大屏再多挪一点
@media (min-width: 992px) {
  .about-container {
    --content-shift: 0; /* 同样修改，保持大屏和小屏效果一致 */
  }
}

/* 新增：等腰三角形 */
.shape.isosceles {
  width: 0;
  height: 0;
  border-left: calc(var(--base) / 2) solid transparent;
  border-right: calc(var(--base) / 2) solid transparent;
  border-bottom: var(--height) solid var(--shape-fill);
  box-shadow: inset 0 0 0 1px var(--shape-stroke);
}

/* 补充 circle 样式，给 class="circle" 的小圆使用 */
.shape.circle {
  width: inherit;
  height: inherit;
  border-radius: 50%;
  /* 方案 A：断续边框 */
  border: 3px dashed var(--shape-stroke);
  background: transparent;

  /* 方案 B：渐变圆环（注释掉上面 border，使用下面的背景） */
  // background: conic-gradient(
  //   from 0deg,
  //   var(--shape-stroke) 0deg 90deg,
  //   transparent 90deg 180deg,
  //   var(--shape-stroke) 180deg 270deg,
  //   transparent 270deg 360deg
  // );
}

.about-link {
  /* 先把渐变剪裁关了 */
  background: none !important;
  -webkit-background-clip: initial !important;
  /* 再把文字填充色赋回去 */
  -webkit-text-fill-color: #73B18B !important;
  color: #73B18B !important;
  text-decoration: underline;
  cursor: pointer;
}
</style>