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
</template>

<script setup lang="ts">
import { readonly } from 'vue';
import BackLink from '@/components/common/BackLink.vue';
import ThemeBackground from '@/components/common/ThemeBackground.vue';

const props = defineProps({
  previewMode: { type: Boolean, default: false },
  hideBackLink: { type: Boolean, default: false }
});

const cards = readonly([
  {
    effect: 'bottom_slide_in',
    title: 'Anne of Green Gables',
    copy: "'Anne of Green Gables' is a heartwarming tale of an imaginative, fiery orphan's adventures and growth.",
    image: 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/anne.jfif'
  },
  {
    effect: 'zoom-in',
    title: 'The lovely bones',
    copy: "'The Lovely Bones' is a poignant tale of a young girl watching from her personal heaven as her family and friends cope with her tragic death.",
    image: 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/bones.jpg'
  },
  {
    effect: 'hover_split',
    title: 'A Song of Ice and Fire',
    copy: 'Noble families vie for Iron Throne amid dragons, magic, shifting alliances, and winter’s looming darkness.',
    image: 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/dragon.jpg'
  },
  {
    effect: 'page_turning',
    title: 'The Witcher',
    copy: 'The Witcher follows Geralt of Rivia, a monster hunter navigating a turbulent world filled with magic and political intrigue.',
    image: 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/the_witcher.jpg'
  },
  {
    effect: 'reveal_blur',
    title: 'The Help',
    copy: 'In 1960s Mississippi, three women cross racial and social divides to write a secret book that challenges the status quo.',
    image: 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/help.webp'
  },
  {
    effect: 'flip_overlay_blur',
    title: 'Heaven Official’s Blessing',
    copy: 'An exiled prince ascends once more as a god, bound to a ghost king by fate and centuries of silent devotion.',
    image: 'https://raw.githubusercontent.com/ooPeachBoy/ImageStore/main/tgcf.jpg'
  }
]);
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
