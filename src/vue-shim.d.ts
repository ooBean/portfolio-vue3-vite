// filepath: portfolio-vue3-vite/src/vue-shim.d.ts (或者 vite-env.d.ts 等)
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}