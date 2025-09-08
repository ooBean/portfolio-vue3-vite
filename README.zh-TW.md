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
git clone https://github.com/ooPeachBoy/portfolio-vue3-vite.git
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

## 技術亮點
1. **聲明式網格渲染**：集中元數據和計算屬性驅動的項目網格，無需手動 DOM 操作。
2. **純 CSS 動畫**：2D/3D 變換、過渡和偽元素利用 GPU 加速實現流暢效果。
3. **國際化**：通過 vue-i18n 動態注入文本，實現無縫語言切換。
4. **混合狀態管理**：結合 Pinia 進行全局 UI 狀態管理和本地 ref 進行組件數據管理，確保清晰的狀態邊界。
5. **性能與可訪問性**：懶加載、滾動節流和響應式佈局優化跨設備用戶體驗。

## 聯繫與招聘
我可接受遠程前端機會，歡迎隨時聯繫：
- GitHub：[ooPeachBoy](https://github.com/ooPeachBoy)
- 郵箱：littlebeancat@outlook.com
 - 線上演示：https://portfolio-vue3-vite-jctce8dja-oopeachboys-projects.vercel.app
