<template>
    <div class="interactive-card-host" :class="{ 'is-preview': previewMode }">
        <div class="back-link-wrapper" v-if="!previewMode">
            <BackLink v-if="!hideBackLink" component="InteractiveCard" class="top-right-link" />
        </div>
        <ThemeBackground />

        <div class="card-wrapper" ref="cardWrapperRef">
            <div class="card-content" :style="cardStyle" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
                <div class="inner-content">
                    <h1>{{ $t('portfolio.interactive_card.subtitle') }}</h1>
                    <p class="author">{{ $t('portfolio.interactive_card.author_prefix') }}<strong>Mrs. Bean</strong></p>
                    <p class="related">
                        <strong>{{ $t('portfolio.interactive_card.inspiration_prefix') }}</strong>
                        <a href="https://codepen.io/ariona/pen/gOaJdWL" target="_blank" rel="noopener noreferrer">
                            {{ $t('portfolio.interactive_card.inspiration_link_text') }}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BackLink from '@/components/common/BackLink.vue';
import ThemeBackground from '@/components/common/ThemeBackground.vue';
const { t } = useI18n();
const props = defineProps({
    previewMode: { type: Boolean, default: false },
    hideBackLink: { type: Boolean, default: false }
});
const cardWrapperRef = ref<HTMLElement | null>(null);

const rotate = reactive({ x: 0, y: 0 });

// 3. 在卡片上监听鼠标移动事件
const onMouseMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { width, height } = rect;

    // 计算鼠标相对于卡片中心的位置
    const mouseX = x - width / 2;
    const mouseY = y - height / 2;

    // 根据鼠标位置计算旋转角度，乘数可以调整灵敏度
    const rotateY = (mouseX / (width / 2)) * 15;
    const rotateX = -(mouseY / (height / 2)) * 15;

    // 更新响应式状态
    rotate.x = rotateX;
    rotate.y = rotateY;
};

// 4. 鼠标移出时，重置卡片状态
const onMouseLeave = () => {
    rotate.x = 0;
    rotate.y = 0;
};

// 5. 使用 computed 属性动态生成 style 对象，这才是 Vue 的精髓
const cardStyle = computed(() => ({
    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
}));
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.interactive-card-host {
    width: 100%;
    height: 100%;
    position: relative;
    /* 新增：在非预览模式下，确保内容居中显示 */
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 新增：预览模式下的专属样式 */
.interactive-card-host.is-preview {
    /* 优化：让根容器应用主题背景色，填满整个预览区域 */
    background: transparent; /* 核心修正：背景应为透明，以透出父级 PreviewCard 的主题背景 */
    overflow: hidden;

    /* 关键：禁用预览内组件的鼠标事件，防止交互冲突 */
    pointer-events: none;

    .card-wrapper {
        /* 关键：将整个卡片等比例缩小到合适的尺寸 */
        transform: scale(0.65);
        transform-origin: center center;
    }
}

.back-link-wrapper {
    position: absolute;
    top: 100px;
    right: 20px;
    z-index: 10;
}

.top-right-link {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    text-decoration: none;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: inline-block;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
    }
}

.card-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
}

.card-content {
    width: 90%;
    max-width: 450px;
    /* 优化：适当增加最大宽度，使其不那么狭窄 */
    aspect-ratio: 16 / 10;
    /* 新增：设置一个协调的宽高比，让卡片形状更美观 */
    max-height: 350px;
    /* 新增：限制一个最大高度，防止在超宽屏上变得过大 */
    padding: 30px;
    /* 使用项目中的主题变量 */
    background: var(--todolist-bg, white);
    border-radius: $border-radius-lg;
    box-shadow: $box-shadow-card;
    /* 优化：使用统一的卡片阴影变量 */

    display: flex;
    align-items: center;
    justify-content: center;

    /* 3D 效果的关键属性 */
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.inner-content {
    text-align: center;
    /* 让内容在 Z 轴上突出，增强立体感 */
    transform: translateZ(60px);
    color: var(--text-color);

    h1 {
        font-family: $font-family-serif-display;
        /* 优化：使用统一定义的衬线字体变量 */
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    p {
        transform: translateZ(30px);
        font-size: 0.9rem;
        opacity: 0.8;
        margin: 0.5rem 0;

        &.related {
            transform: translateZ(50px);
            font-style: italic;
        }
    }

    a {
        /* 使用项目中的主题色变量 */
        color: $primary-color;
        text-decoration: none;
        pointer-events: auto;
        border-bottom: 1px solid transparent;
        transition: border-color 0.3s;

        &:hover {
            border-color: $primary-color;
        }
    }
}
</style>