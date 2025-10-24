# Bean's Front-end Portfolio

<p align="center">
  <a href="./README.md">🇬🇧 English</a> |
  <a href="./README.zh-CN.md">🇨🇳 简体中文</a> |
  <a href="./README.zh-TW.md">🇹🇼 繁體中文</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ooBean/AssetHub/main/gifs/portfolio-vue3-vite/portfolio.gif" alt="Portfolio Vue3-Vite Demo" width="800"/>
</p>

 Welcome to my personal portfolio, showcasing a collection of interactive web components and demos built with Vue 3, TypeScript, and Vite.

## Features
- Interactive 3D card with tilt and perspective effects
- Responsive, animated image hover gallery
- Fully internationalized content with vue-i18n (en, zh, zh-TW)
- A Todo List with deep reactivity and session persistence
- Chat demo simulating asynchronous messaging and typing indicators
- Living Design System with in-place editing and adaptive tables
- Pure CSS masonry gallery with scroll loading and throttling

## Tech Stack
- Framework: Vue 3 (`<script setup>`)
- Language: TypeScript
- Bundler: Vite
- State Management: Pinia
- Internationalization: vue-i18n
- Styling: SCSS, CSS Grid, Flexbox

## Installation
```bash
# clone the repo
git clone https://github.com/ooBean/portfolio-vue3-vite.git
cd portfolio-vue3-vite
# install dependencies
yarn install    # or npm install
```

## Development
```bash
# start local server
yarn dev         # or npm run dev
```

## Building for Production
```bash
yarn build       # or npm run build
```

## Layout & Components
- `src/views/portfolio/index.vue`: Overview grid of projects using `PreviewCard`
- `Todo.vue`: Task list with deep watch and transition-group
- `DesignSystem.vue`: Interactive design document with search and in-place editing
- `InteractiveCard.vue`: 3D hover card using CSS transforms
- `Gallery.vue` & `ImageHoverEffects.vue`: Responsive gallery with pure CSS effects
- `Chat.vue`: Simulated chat with typing indicator and i18n support

## 🚀 Core Technical Highlights

### Architecture Design
- **Modern Frontend Stack**: Vue 3 + TypeScript + Vite with Composition API and `<script setup>` syntax
- **Hybrid State Management**: Pinia for global state, local refs for component state, sessionStorage for persistence
- **Declarative Component Architecture**: Configuration-driven component rendering with on-demand loading and dynamic routing

### Performance Optimization
- **GPU Accelerated Animations**: Pure CSS 2D/3D transforms leveraging `will-change` for optimal rendering performance
- **Smart Loading Strategies**: Scroll throttling, lazy loading, and request debouncing for enhanced user experience
- **Responsive Design**: CSS Grid + Flexbox elastic layouts with mobile-first media queries

### Interactive Innovations
- **3D Interactive Cards**: Real-time mouse position tracking, CSS perspective space, preview mode adaptation
- **Smart Chat Interface**: Async message simulation, typing indicators, auto-scroll optimization
- **Advanced Image Gallery**: Pure CSS masonry layout, hover effects, hybrid state management

### Engineering Practices
- **Complete Internationalization**: Multi-language support (en/zh), dynamic text injection, multilingual technical docs
- **Developer Experience**: TypeScript strict mode, custom directives, modular SCSS architecture
- **Cross-Platform Deployment**: Multi-environment configs (GitHub Pages, Vercel), modern browser compatibility

## Contact & Hire Me
I’m available for remote front-end opportunities. Feel free to connect:
- GitHub: [ooBean](https://github.com/ooBean)
- Email: littlebeancat@outlook.com
 - Live Demo: https://portfolio-vue3-vite-git-master-oopeachboys-projects.vercel.app