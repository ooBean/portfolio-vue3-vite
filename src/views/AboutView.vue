// filepath: portfolio-vue3-vite/src/views/AboutView.vue
<template>
  <div class="about-view">
    <h2>关于我</h2>
    <section class="intro">
      <p>
        你好！我是一名热衷于构建美观、易用且高效 Web 应用的前端开发者。
        我擅长使用 Vue.js (Vue 2 和 Vue 3) 进行开发，并且对 JavaScript、HTML5 和 CSS3 有着扎实的掌握。
      </p>
      <p>
        我喜欢探索新技术，追求代码的优雅与性能的极致。我相信良好的用户体验是衡量一个产品成功与否的关键标准之一。
      </p>
    </section>

    <section class="skills">
      <h3>我的技能栈</h3>
      <ul>
        <li><strong>前端框架:</strong> Vue 2, Vue 3 (Composition API, Pinia, Vue Router)</li>
        <li><strong>核心技术:</strong> JavaScript (ES6+), HTML5, CSS3 (Flexbox, Grid, Animations, Responsive Design)</li>
        <li><strong>CSS 工具:</strong> Sass/SCSS, PostCSS, (可选: Tailwind CSS)</li>
        <li><strong>构建工具:</strong> Vite, Webpack</li>
        <li><strong>版本控制:</strong> Git, GitHub/GitLab</li>
        <li><strong>API 交互:</strong> RESTful APIs, Axios</li>
        <li><strong>测试 (可选):</strong> Vitest, Jest, Vue Test Utils</li>
        <li><strong>其他:</strong> TypeScript (基础), Node.js (基础), Web Performance Optimization</li>
      </ul>
    </section>

    <section class="experience">
      <h3>项目经验/学习经历</h3>
      <p>
        (这里可以简述你的主要项目经验或重要的学习经历，突出你在项目中扮演的角色和取得的成果。)
      </p>
      <ul>
        <li>项目A: 负责XX模块开发，使用Vue 3和Pinia，实现了XX功能，提升了XX性能...</li>
        <li>项目B: 参与XX系统的前端重构，从Vue 2迁移到Vue 3，优化了XX...</li>
      </ul>
    </section>

     <section class="philosophy">
      <h3>我的开发理念</h3>
      <p>
        我坚信代码不仅要能工作，更要易于理解和维护。我追求编写简洁、模块化且文档清晰的代码。
        同时，我非常注重用户体验和界面性能，力求为用户带来流畅和愉悦的交互感受。
      </p>
    </section>
  </div>
</template>

<script setup>
// No specific script needed for this static page yet
</script>

<style scoped>
.about-view {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.7;
}
.about-view h2 {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.2rem;
  color: var(--primary-color);
}
.about-view h3 {
  font-size: 1.6rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}
.about-view section {
  margin-bottom: 2.5rem;
}
.skills ul {
  list-style: none;
  padding-left: 0;
}
.skills li {
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
}
.skills strong {
  color: var(--secondary-color);
  min-width: 120px; /* 调整以对齐 */
  display: inline-block;
}
.intro p, .experience p, .philosophy p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.experience ul {
    list-style: disc;
    padding-left: 20px;
}
.experience li {
    margin-bottom: 0.5rem;
}
</style>