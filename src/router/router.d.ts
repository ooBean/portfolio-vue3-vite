// filepath: src/router.d.ts (或者其他 .d.ts 文件，例如 src/vue-router.d.ts)
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    transition?: string; // 将 transition 定义为可选的字符串类型
    // 如果你的 meta 对象中还有其他自定义字段，也在这里声明它们的类型
    // example?: boolean;
  }
}