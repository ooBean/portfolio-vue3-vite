<template>
  <ThemeBackground />
  <div class="imageHoverEffects" :preview="previewMode">
    <BackLink v-if="!hideBackLink" component="imageHoverEffects" class="top-right-link" />
    <div class="cards">
      <div class="card" v-for="(card, index) in cards" :key="index" :class="card.effect">
        <figure class="content">
          <img :src="card.image" :alt="card.title" />
          <figcaption class="content-details">
            <h2 class="title">{{ card.title }}</h2>
            <p class="copy">{{ card.copy }}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>

  <TechHighlights v-if="!hideBackLink">
    <h4>CSS驱动的声明式动画</h4>
    <p>所有悬停效果均通过纯CSS实现，未使用任何JavaScript。动画大量运用了 <code>transform</code>
      (2D/3D)、<code>transition</code>、<code>filter</code> 以及伪元素
      (<code>::before</code>/<code>::after</code>)，充分利用GPU加速，以确保动画的流畅性。这种声明式的实现方式，使得代码直观且易于维护。</p>

    <h4>模块化与数据驱动设计</h4>
    <p>组件通过 <code>v-for</code> 指令循环渲染一个数据对象数组。每种悬停效果被封装为一个独立的CSS类，并通过数据绑定 (<code>:class="card.effect"</code>)
      应用到卡片上。这种设计模式使得效果本身与组件逻辑解耦，添加或修改一种新的悬停效果，仅需增删CSS类和数据条目，扩展性强。</p>

    <h4>现代响应式布局与国际化</h4>
    <p>卡片画廊采用 CSS Grid 布局，并结合 <code>auto-fit</code> 和 <code>minmax()</code> 函数，构建了一个无需额外媒体查询的、自适应的响应式网格。同时，卡片内的所有文本内容均通过
      <code>vue-i18n</code> 和 <code>computed</code> 属性实现国际化，可根据用户语言环境动态展示相应内容</p>
  </TechHighlights>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BackLink from '@/components/common/BackLink.vue';
import ThemeBackground from '@/components/common/ThemeBackground.vue';
import { cardsData } from '@/store/modules/i18nStore';
import type { Language } from '@/types/unsplash';
import TechHighlights from '@/components/common/TechHighlights.vue';

const props = defineProps({
  previewMode: { type: Boolean, default: false },
  hideBackLink: { type: Boolean, default: false }
});

const { locale } = useI18n();

const isLanguage = (lang: string): lang is Language => {
  return ['en', 'zh', 'zh-TW'].includes(lang);
};

const cards = computed(() => {
  const lang = locale.value;
  if (isLanguage(lang)) {
    return cardsData[lang];
  }
  return cardsData.en;
});
</script>

<style lang="scss" scoped>
$top-right-link-bg: rgba(255, 255, 255, 0.1);
$top-right-link-bg-hover: rgba(255, 255, 255, 0.2);
$top-right-link-color: var(--todolist-text-color, #fff);
$top-right-link-padding: 6px 12px;
$top-right-link-radius: 8px;
$top-right-link-font-size: 12px;
$top-right-link-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

$card-border-radius: $border-radius-md;
$card-bg: var(--chat-messages-bg, $chat-theme-light-messages-bg);
$card-box-shadow: var(--chat-message-shadow, $box-shadow);
$card-transition: all 0.3s ease;

$content-color: var(--chat-accent-color);
$content-height: 400px;
$content-border-radius: $border-radius-md;
$content-transition: all 0.5s ease;

$content-details-bg-gradient: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.95));
$content-details-padding: 2rem;
$content-details-z-index: 2;
$content-details-transition: all 0.5s ease;

.top-right-link {
  background: $top-right-link-bg;
  color: $top-right-link-color;
  padding: $top-right-link-padding;
  border-radius: $top-right-link-radius;
  font-size: $top-right-link-font-size;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: $top-right-link-box-shadow;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: fixed;
  top: 130px;
  right: 38px;
  z-index: 10;

  &:hover {
    background: $top-right-link-bg-hover;
    transform: translateY(-1px);
  }
}

.imageHoverEffects {
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    justify-items: center;
    /* 新增：让所有网格项在其单元格内水平居中 */
  }

  .card {
    position: relative;
    border-radius: $card-border-radius;
    background: $card-bg;
    box-shadow: $card-box-shadow;
    transition: $card-transition;
    min-height: 300px;

    .content {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: $content-border-radius;
      color: $content-color;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: $content-transition;
      }

      .content-details {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: $content-details-z-index;
        padding: $content-details-padding;
        background: $content-details-bg-gradient;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title,
        .copy {
          opacity: 0;
          transform: translateY(20px);
          transition: $content-details-transition;
          display: block;
        }
      }
    }

    &:hover .content-details {

      .title,
      .copy {
        opacity: 1;
        transform: translateY(0);
      }

      .title {
        transition-delay: 0.1s;
      }

      .copy {
        transition-delay: 0.2s;
      }
    }

    &.bottom_slide_in:hover {
      .content-details {
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.95));
      }

      img {
        transform: scale(1.05);
        filter: brightness(0.7);
      }
    }

    &.zoom-in {
      perspective: 1000px;

      .content {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 120%;
          background: linear-gradient(226deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 35%, rgba(255, 255, 255, 0.2) 42%, rgba(255, 255, 255, 0) 60%);
          transform: translateY(-20%);
          transition: transform 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);
          z-index: 100;
        }

        &::before {
          content: '';
          position: absolute;
          top: 5%;
          left: 5%;
          width: 90%;
          height: 90%;
          background: rgba(#353540, 0.5);
          box-shadow: 0 6px 12px 12px rgba(#353540, 0.4);
          transform: skewX(0.001deg);
          transition: transform 0.35s ease-in-out, opacity 0.5s ease-in-out;
        }
      }

      &:hover .content {
        img {
          transform: rotateX(7deg) translateY(-6px);
        }

        &::after {
          transform: translateY(0%);
        }

        &::before {
          opacity: 0.6;
          transform: rotateX(7deg) translateY(-6px) scale(1.05);
        }

        .content-details {
          transform: rotateX(7deg) translateY(-6px);
        }
      }
    }

    &.hover_split {

      .content::before,
      .content::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 50%;
        left: -100%;
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 2;
      }

      .content::before {
        top: 0;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .content::after {
        bottom: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        transition-delay: 0.2s;
      }

      &:hover .content {

        &::before,
        &::after {
          transform: translateX(100%);
        }

        img {
          transform: scale(1.1);
          filter: brightness(0.7) blur(2px);
        }
      }
    }

    &.page_turning {
      .content {
        perspective: 1200px;
        position: relative;

        img {
          transform-origin: 0 50%;
          backface-visibility: hidden;
        }

        .content-details {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;

          opacity: 0;
          transform: rotateY(-180deg);
          transform-origin: 100% 50%;
          backface-visibility: hidden;
          transition: all 0.6s ease;
        }
      }

      &:hover .content {
        img {
          transform: rotateY(-180deg);
        }

        .content-details {
          opacity: 1;
          transform: rotateY(0);
        }
      }
    }

    &.reveal_blur {
      .content {
        position: relative;

        img {
          transition: all 0.5s ease;
        }

        .content-details {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(2px);
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.4s ease;
        }
      }

      &:hover {
        img {
          filter: brightness(0.5) blur(2px);
          transform: scale(1.05);
        }

        .content-details {
          opacity: 1;
          transform: scale(1);
        }
      }
    }

    &.flip_overlay_blur {
      .content {
        position: relative;
        overflow: hidden;
        border-radius: $card-border-radius;
        perspective: 1000px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.5s ease;
          display: block;
          border-radius: inherit;
        }

        .content-details {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotateX(90deg);
          transform-origin: center;
          width: 90%;
          height: 80%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
          border-radius: $card-border-radius;
          text-align: center;
          padding: 1.5rem;
          opacity: 0;
          transition: all 0.7s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .copy {
          font-size: 0.95rem;
          line-height: 1.4;
        }
      }

      &:hover .content {
        img {
          filter: brightness(0.3) blur(2px);
        }

        .content-details {
          transform: translate(-50%, -50%) rotateX(0deg);
          opacity: 1;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1rem !important;
  }

  .copy {
    font-size: 0.85rem !important;
  }
}
</style>
