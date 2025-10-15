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
git clone https://github.com/ooBean/portfolio-vue3-vite.git
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

## 🚀 核心技术亮点

### 架构设计
- **现代前端技术栈**: Vue 3 + TypeScript + Vite，使用 Composition API 和 `<script setup>` 语法
- **混合状态管理**: Pinia 管理全局状态，局部 ref 管理组件状态，sessionStorage 实现持久化
- **声明式组件架构**: 配置驱动的组件渲染，支持按需加载和动态路由

### 性能优化
- **GPU 加速动画**: 纯 CSS 实现的 2D/3D 变换，利用 `will-change` 优化渲染性能
- **智能加载策略**: 滚动节流、懒加载和请求防抖，优化用户体验
- **响应式设计**: CSS Grid + Flexbox 弹性布局，移动优先的媒体查询

### 交互创新
- **3D 交互卡片**: 实时鼠标位置追踪，CSS 透视空间，预览模式适配
- **智能聊天界面**: 异步消息模拟，打字指示器，自动滚动优化
- **高级图片画廊**: 纯 CSS 瀑布流，悬停效果，混合状态管理

### 工程化实践
- **完整国际化**: 支持中英文切换，动态文本注入，技术文档多语言
- **开发体验优化**: TypeScript 严格模式，自定义指令，模块化 SCSS
- **跨平台部署**: 多环境配置（GitHub Pages, Vercel），现代浏览器兼容

## 联系与招聘
我可接受远程前端机会，欢迎随时联系：
- GitHub：[ooBean](https://github.com/ooBean)
- 邮箱：littlebeancat@outlook.com
 - 在线演示：http://bean.binballs.top/
