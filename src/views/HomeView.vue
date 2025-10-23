<template>
  <div class="home-view">
    <!-- Layer 1: Default text (Bottom layer, visible by default) -->
    <div class="text-layer top-layer">
      <div class="text-content" @mouseenter="growCircle" @mouseleave="shrinkCircle">
        <div v-for="(line, lineIndex) in lines.default" :key="`default-${lineIndex}`" class="line">
          <span v-for="(segment, segmentIndex) in line" :key="segmentIndex" :class="{ hint: segment.isHint }">
            {{ segment.text }}
          </span>
        </div>
      </div>
    </div>

    <!-- Layer 2: Revealed content (Top layer, revealed on hover) -->
    <div class="text-layer bottom-layer" ref="bottomLayerRef">
      <div class="text-content">
        <div v-for="(line, lineIndex) in lines.hover" :key="`hover-${lineIndex}`" class="line">
          <span v-for="(segment, segmentIndex) in line" :key="segmentIndex">
            {{ segment.text }}
          </span>
        </div>
        <div class="discover-more">
          psst discover more →
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useI18nStore } from '@/store/modules/i18nStore';
import { gsap } from 'gsap';

// --- i18n setup ---
interface TextSegment {
  text: string;
  highlight?: boolean;
  isHint?: boolean;
}
type Line = TextSegment[];
interface Home {
  lines: {
    default: Line[];
    hover: Line[];
  };
}
const i18nStore = useI18nStore();
const { getLocaleMessage } = useI18n();
const lines = ref<Home['lines']>({ default: [], hover: [] });

function updateLines(lang: string) {
  const messages = getLocaleMessage(lang) as any;
  lines.value = messages.home?.lines ?? { default: [], hover: [] };
}
watch(() => i18nStore.currentLang, updateLines, { immediate: true });

// --- FINAL STABLE REFACTOR ---
const bottomLayerRef = ref<HTMLElement | null>(null);

let xTo: (value: number) => void;
let yTo: (value: number) => void;
let tl: gsap.core.Timeline;

const mainMove = (e: MouseEvent) => {
  yTo(e.pageY);
  xTo(e.pageX);
};

const onFirstMove = (e: MouseEvent) => {
  if (bottomLayerRef.value) {
    gsap.set(bottomLayerRef.value, { visibility: 'visible', '--x': `${e.pageX}px`, '--y': `${e.pageY}px` });
  }
  window.removeEventListener('mousemove', onFirstMove);
  window.addEventListener('mousemove', mainMove);
};

// Event handlers for the whole text block
function growCircle() {
  tl.restart();
}

function shrinkCircle() {
  tl.reverse();
}

onMounted(() => {
  if (bottomLayerRef.value) {
    xTo = gsap.quickTo(bottomLayerRef.value, '--x', { duration: 0.4, ease: 'power4.out' });
    yTo = gsap.quickTo(bottomLayerRef.value, '--y', { duration: 0.4, ease: 'power4.out' });

    tl = gsap.timeline({ paused: true });
    tl.to(bottomLayerRef.value, {
      '--size': '250px',
      duration: 0.75,
      ease: 'back.out(1.7)',
    });
  }

  window.addEventListener('mousemove', onFirstMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onFirstMove);
  window.removeEventListener('mousemove', mainMove);
  if (tl) {
    tl.kill();
  }
});
</script>

<style scoped lang="scss">
.home-view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: calc(100vh - 64px - 48px);
  background: $hero-bg-color;
  cursor: pointer;
  position: relative;
}

.text-layer {
  // Both layers are fixed to cover the whole viewport, ensuring alignment
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* pointer-events are handled by the specific .top-layer and .bottom-layer classes */
}

.text-content {
  width: 95%;
  max-width: 1200px;
  text-align: center;
  font-family: 'Georgia', serif;
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  line-height: 1.2;
  position: relative; // For discover-more positioning
}

.top-layer {
  z-index: 1; // Bottom text layer
  color: $hero-text-color; // Use the high-contrast variable
  pointer-events: auto; // This layer should be interactive
}

.bottom-layer {
  z-index: 2; // Top revealed layer

  // --- Glassmorphism Effect ---
  background: rgba(232, 170, 190, 0.25); // Semi-transparent glass color
  backdrop-filter: blur(5px) saturate(120%); // Frosted glass blur + color pop
  
  color: $hero-heading-color;
  pointer-events: none; // Pass clicks through

  // --- Replicating the CodePen mask effect ---
  --x: 0px;
  --y: 0px;
  --size: 15px; // Default cursor size

  -webkit-mask-image: radial-gradient(circle at var(--x) var(--y), black var(--size), transparent 0);
  mask-image: radial-gradient(circle at var(--x) var(--y), black var(--size), transparent 0);

  // Initially invisible
  visibility: hidden;
}

.line {
  margin: 0.1em 0;
}

.discover-more {
    position: absolute;
    bottom: -2em; // Position below the text block
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
    color: #fff;
    opacity: 0.8;
    white-space: nowrap;
}

:deep(.hint) {
  font-size: 0.6em;
  opacity: 0.7;
  font-style: italic;
}
</style>