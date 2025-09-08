# Bean's Front-end Portfolio

 [English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md)

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
git clone https://github.com/ooPeachBoy/portfolio-vue3-vite.git
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

## Technical Highlights
1. **Declarative Grid Rendering**: Centralized metadata and computed properties drive the project grid without manual DOM manipulations.
2. **Pure CSS Animations**: 2D/3D transforms, transitions, and pseudo-elements leverage GPU acceleration for smooth effects.
3. **Internationalization**: Dynamic text injection via vue-i18n enables seamless language switching.
4. **Hybrid State Management**: Combining Pinia for global UI state and local refs for component data ensures clear state boundaries.
5. **Performance & Accessibility**: Lazy-loading, scroll throttling, and responsive layouts optimize UX across devices.

## Contact & Hire Me
I’m available for remote front-end opportunities. Feel free to connect:
- GitHub: [ooPeachBoy](https://github.com/ooPeachBoy)
- Email: littlebeancat@outlook.com
 - Live Demo: https://portfolio-vue3-vite-jctce8dja-oopeachboys-projects.vercel.app
