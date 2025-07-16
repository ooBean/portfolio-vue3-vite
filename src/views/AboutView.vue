<template>
  <div class="about-container">
    <!-- 背景几何图形 -->
    <div class="bg-shapes">
      <div
        v-for="shape in bgShapes"
        :key="shape.id"
        :class="['shape', shape.class]"
        :style="shape.style"
      ></div>
    </div>

    <div class="floating-icons left">
      <div
        v-for="icon in leftIcons"
        :key="icon.id"
        class="icon-rotate"
        :style="icon.style"
      >
        <div class="icon-wrapper">
          <img :src="icon.src" :alt="icon.alt" />
        </div>
      </div>
    </div>

    <div class="content">
      <h1>Web Developer</h1>
      <p>Creating digital experiences that matter</p>
    </div>

    <div class="floating-icons right">
      <div
        v-for="icon in rightIcons"
        :key="icon.id"
        class="icon-rotate"
        :style="icon.style"
      >
        <div class="icon-wrapper">
          <img :src="icon.src" :alt="icon.alt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 统一引入所有SVG图标
import anquanIcon from '@/assets/icons/anquan.svg';
import bootstrapIcon from '@/assets/icons/Bootstrap.svg';
import cssIcon from '@/assets/icons/css.svg';
import gameIcon from '@/assets/icons/Game.svg';
import gitIcon from '@/assets/icons/git.svg';
import githubIcon from '@/assets/icons/github.svg';
import htmlIcon from '@/assets/icons/html.svg';
import javascriptIcon from '@/assets/icons/JavaScript.svg';
import lessIcon from '@/assets/icons/less.svg';
import reactIcon from '@/assets/icons/react.svg';
import scssIcon from '@/assets/icons/scss.svg';
import securityIcon from '@/assets/icons/security.svg';
import tailwindcssIcon from '@/assets/icons/tailwindcss.svg';
import typescriptIcon from '@/assets/icons/typescript.svg';
import vueIcon from '@/assets/icons/vue.svg';
import webCodingIcon from '@/assets/icons/webCoding.svg';

// leftIcons当中的图标可以再向中间靠拢些吗
const leftIcons = [
  { id: 1, src: anquanIcon,    alt: 'anquan',     style: { top: '10%', left: '10%', '--delay': '0s'   } },
  { id: 2, src: cssIcon,       alt: 'CSS',        style: { top: '25%', left: '15%', '--delay': '0.5s' } },
  { id: 3, src: gameIcon,      alt: 'Game',       style: { top: '45%', left: '10%', '--delay': '1s'   } },
  { id: 4, src: htmlIcon,      alt: 'HTML',       style: { top: '65%', left: '20%', '--delay': '1.5s' } },
  { id: 5, src: javascriptIcon,alt: 'JavaScript', style: { top: '35%', left: '28%', '--delay': '2s'   } },
  { id:13, src: tailwindcssIcon,alt:'TailwindCSS', style: { top: '50%', left: '30%', '--delay': '3s'   } },
  { id:14, src: securityIcon,  alt: 'Security',   style: { top: '75%', left: '12%', '--delay': '3.5s' } },
  { id: 12, src: gitIcon,       alt: 'Git',        style: { top: '55%', left: '45%', '--delay': '2.5s' } },
  { id: 13, src: githubIcon,    alt: 'GitHub',     style: { top: '70%', left: '52%', '--delay': '3s'   } },
];

// 整个rightIcons当中的图标可以再向中间靠拢些吗
const rightIcons = [
  { id: 6, src: lessIcon,      alt: 'Less',       style: { top: '8%',  left: '50%', '--delay': '0.5s' } },
  { id: 7, src: reactIcon,     alt: 'React',      style: { top: '20%', left: '58%', '--delay': '1s'   } },
  { id: 8, src: scssIcon,      alt: 'SCSS',       style: { top: '32%', left: '65%', '--delay': '1.5s' } },
  { id: 9, src: typescriptIcon,alt: 'TypeScript', style: { top: '45%', left: '42%', '--delay': '2s'   } },
  { id:10, src: vueIcon,       alt: 'Vue',        style: { top: '70%', left: '88%', '--delay': '0.5s' } },
  { id:11, src: webCodingIcon, alt: 'WebCoding',  style: { top: '60%', left: '75%', '--delay': '1.5s' } },
  { id:15, src: bootstrapIcon, alt: 'Bootstrap',   style: { top: '50%', left: '82%', '--delay': '2s'   } },
];

// 调整后：左右两侧各分布三个几何图形
const bgShapes = [
  // 左侧：圆形
  {
    id: 1,
    class: 'circle',
    style: {
      top: '15%',
      left: '28%',
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
  --shape-fill: rgba(59,130,246,0.08);
  --shape-stroke: rgba(59,130,246,0.2);
  --gradient-start: rgba(59,130,246,0.12);
  --gradient-end: rgba(59,130,246,0);
}

/* 背景几何体容器 */
.bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
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
  background: var(--shape-fill);        // 半透明填充
  border: 2px solid var(--shape-stroke); // 清晰可见的描边
  border-radius: 50%;
}

/* 删除或注释掉原先的 radial-gradient 定义 */
// .shape.gradient-circle {
//   background: radial-gradient(
//     circle at center,
//     var(--gradient-start) 0%,
//     var(--gradient-end) 70%
//   );
// }

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
  clip-path: polygon(
    25% 6.7%,
    75% 6.7%,
    100% 50%,
    75% 93.3%,
    25% 93.3%,
    0% 50%
  );
}

@keyframes shapeRotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* 让图标和文字保持在最上层 */
.floating-icons,
.content {
  position: relative;
  z-index: 10;
}

.floating-icons.left,
.floating-icons.right {
  position: absolute;
  top: 0; bottom: 0;
  width: 45%;
  pointer-events: none;
}

.floating-icons.left { left: 0; }
.floating-icons.right { right: 0; }

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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  animation:
    floatUpDown 4s ease-in-out var(--delay) infinite,
    floatDrift 6s ease-in-out var(--delay) infinite;
}
.icon-wrapper img {
  width: 28px;
  height: 28px;
  user-select: none;
  pointer-events: none;
}
@keyframes floatRotate {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}
@keyframes floatUpDown {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-8px); }
}
@keyframes floatDrift {
  0%,100% { transform: translate(0,0) scale(1); }
  25%      { transform: translate(5px,-5px) scale(1.1); }
  50%      { transform: translate(0,8px) scale(0.9); }
  75%      { transform: translate(-5px,-3px) scale(1);}
}

.content {
  position: relative;
  z-index: 10;
  max-width: 300px;
  text-align: center;
  background: linear-gradient(135deg, #f6d365, #fda085);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
</style>