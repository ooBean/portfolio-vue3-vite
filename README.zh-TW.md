# Bean 的前端作品集

歡迎來到我的個人作品集，展示使用 Vue 3、TypeScript 和 Vite 構建的一系列互動式網頁組件和演示。

## 功能
- 具有傾斜和透視效果的交互式 3D 卡片
- 響應式、動畫的圖片懸停畫廊
- 使用 vue-i18n 完全國際化的內容（en, zh, zh-TW）
- 使用深度響應性和會話持久性的待辦列表
- 模擬異步消息和打字指示器的聊天演示
- 具有就地編輯和自適應表格的實時設計系統
- 具有滾動加載和節流的純 CSS 砌塊畫廊

## 技術棧
- 框架：Vue 3 (`<script setup>`)
- 語言：TypeScript
- 打包工具：Vite
- 狀態管理：Pinia
- 國際化：vue-i18n
- 樣式：SCSS, CSS Grid, Flexbox

## 安裝
```bash
# 克隆倉庫
git clone https://github.com/ooBean/portfolio-vue3-vite.git
cd portfolio-vue3-vite
# 安裝依賴
yarn install    # 或 npm install
```

## 開發
```bash
# 啟動本地伺服器
yarn dev         # 或 npm run dev
```

## 生產構建
```bash
yarn build       # 或 npm run build
```

## 布局與組件
- `src/views/portfolio/index.vue`：使用 `PreviewCard` 的項目概覽網格
- `Todo.vue`：具有深度觀察和 transition-group 的任務列表
- `DesignSystem.vue`：具有搜索和就地編輯的交互式設計文檔
- `InteractiveCard.vue`：使用 CSS 變換的 3D 懸停卡片
- `Gallery.vue` & `ImageHoverEffects.vue`：具有純 CSS 效果的響應式畫廊
- `Chat.vue`：具有打字指示和 i18n 支持的模擬聊天

## 🚀 核心技術亮點

### 架構設計
- **現代前端技術棧**: Vue 3 + TypeScript + Vite，使用 Composition API 和 `<script setup>` 語法
- **混合狀態管理**: Pinia 管理全域狀態，局部 ref 管理組件狀態，sessionStorage 實現持久化
- **聲明式組件架構**: 配置驅動的組件渲染，支援按需加載和動態路由

### 性能優化
- **GPU 加速動畫**: 純 CSS 實現的 2D/3D 變換，利用 `will-change` 優化渲染性能
- **智能加載策略**: 滾動節流、懶加載和請求防抖，優化用戶體驗
- **響應式設計**: CSS Grid + Flexbox 彈性佈局，移動優先的媒體查詢

### 交互創新
- **3D 交互卡片**: 即時鼠標位置追蹤，CSS 透視空間，預覽模式適配
- **智能聊天界面**: 異步消息模擬，打字指示器，自動滾動優化
- **高級圖片畫廊**: 純 CSS 瀑布流，懸停效果，混合狀態管理

### 工程化實踐
- **完整國際化**: 支援中英文切換，動態文本注入，技術文檔多語言
- **開發體驗優化**: TypeScript 嚴格模式，自定義指令，模組化 SCSS
- **跨平台部署**: 多環境配置（GitHub Pages, Vercel），現代瀏覽器兼容

## 聯繫與招聘
我可接受遠程前端機會，歡迎隨時聯繫：
- GitHub：[ooBean](https://github.com/ooBean)
- 郵箱：littlebeancat@outlook.com
 - 線上演示：http://bean.binballs.top/
