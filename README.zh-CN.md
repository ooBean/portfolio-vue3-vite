# Bean 的前端作品集

欢迎来到我的个人作品集，展示使用 Vue 3、TypeScript 和 Vite 构建的一系列交互式网页组件和演示。

## 功能
- 具有倾斜和透视效果的交互式 3D 卡片
- 响应式、动画的图片悬停画廊
- 使用 vue-i18n 完全国际化的内容（en, zh, zh-TW）
- 使用深度响应性和会话持久性的待办列表
- 模拟异步消息和打字指示器的聊天演示
- 具有就地编辑和自适应表格的实时设计系统
- 具有滚动加载和节流的纯 CSS 砌块画廊

## 技术栈
- 框架：Vue 3 (`<script setup>`)
- 语言：TypeScript
- 打包工具：Vite
- 状态管理：Pinia
- 国际化：vue-i18n
- 样式：SCSS, CSS Grid, Flexbox

## 安装
```bash
# 克隆仓库
git clone https://github.com/ooPeachBoy/portfolio-vue3-vite.git
cd portfolio-vue3-vite
# 安装依赖
yarn install    # 或 npm install
```

## 开发
```bash
# 启动本地服务器
yarn dev         # 或 npm run dev
```

## 生产构建
```bash
yarn build       # 或 npm run build
```

## 布局与组件
- `src/views/portfolio/index.vue`：使用 `PreviewCard` 的项目概览网格
- `Todo.vue`：具有深度观察和 transition-group 的任务列表
- `DesignSystem.vue`：具有搜索和就地编辑的交互式设计文档
- `InteractiveCard.vue`：使用 CSS 变换的 3D 悬停卡片
- `Gallery.vue` & `ImageHoverEffects.vue`：具有纯 CSS 效果的响应式画廊
- `Chat.vue`：具有打字指示和 i18n 支持的模拟聊天

## 技术亮点
1. **声明式网格渲染**：集中元数据和计算属性驱动的项目网格，无需手动 DOM 操作。
2. **纯 CSS 动画**：2D/3D 变换、过渡和伪元素利用 GPU 加速实现流畅效果。
3. **国际化**：通过 vue-i18n 动态注入文本，实现无缝语言切换。
4. **混合状态管理**：结合 Pinia 进行全局 UI 状态管理和本地 ref 进行组件数据管理，确保清晰的状态边界。
5. **性能与可访问性**：懒加载、滚动节流和响应式布局优化跨设备用户体验。

## 联系与招聘
我可接受远程前端机会，欢迎随时联系：
- GitHub：[ooPeachBoy](https://github.com/ooPeachBoy)
- 邮箱：littlebeancat@outlook.com
 - 在线演示：https://portfolio-vue3-vite-414l1xcnz-oopeachboys-projects.vercel.app
