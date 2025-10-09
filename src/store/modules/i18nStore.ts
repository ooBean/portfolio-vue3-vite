import { defineStore } from 'pinia'

// 定义语言类型
export type Language = 'en' | 'zh' | 'zh-TW';

// 定义状态接口
interface I18nState {
  currentLang: Language;
}

export const useI18nStore = defineStore('i18n', {
  state: (): I18nState => ({
    currentLang: (localStorage.getItem('lang') as Language) || 'en',
  }),

  actions: {
    // 修改 setLanguage 方法，不再直接调用 useI18n
    setLanguage(lang: Language) {
      // 仅更新 store 中的状态和 localStorage
      this.currentLang = lang;
      localStorage.setItem('lang', lang);
    },

    initLanguage() {
      const savedLang = localStorage.getItem('lang') as Language | null;
      if (savedLang && ['en', 'zh', 'zh-TW'].includes(savedLang)) {
        this.currentLang = savedLang;
      } else {
        // 浏览器默认语言
        const browserLang = navigator.language;
        if (browserLang.startsWith('zh')) {
          // 检测是否为台湾/香港地区
          if (browserLang === 'zh-TW' || browserLang === 'zh-HK') {
            this.currentLang = 'zh-TW';
          } else {
            this.currentLang = 'zh';
          }
        } else {
          this.currentLang = 'en';
        }
      }
      // 返回当前语言，以便在 main.ts 中使用
      return this.currentLang;
    }
  },

  getters: {
    getAppLanguage: (state): Language => state.currentLang,
  }
})

export const cardsData = {
  en: [
    {
      effect: 'bottom_slide_in',
      title: 'Anne of Green Gables',
      copy: "'Anne of Green Gables' is a heartwarming tale of an imaginative, fiery orphan's adventures and growth.",
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/anne.jfif'
    },
    {
      effect: 'zoom-in',
      title: 'The lovely bones',
      copy: "'The Lovely Bones' is a poignant tale of a young girl watching from her personal heaven as her family and friends cope with her tragic death.",
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/bones.jpg'
    },
    {
      effect: 'hover_split',
      title: 'A Song of Ice and Fire',
      copy: 'Noble families vie for Iron Throne amid dragons, magic, shifting alliances, and winter’s looming darkness.',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/dragon.jpg'
    },
    {
      effect: 'page_turning',
      title: 'The Witcher',
      copy: 'The Witcher follows Geralt of Rivia, a monster hunter navigating a turbulent world filled with magic and political intrigue.',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/the_witcher.jpg'
    },
    {
      effect: 'reveal_blur',
      title: 'The Help',
      copy: 'In 1960s Mississippi, three women cross racial and social divides to write a secret book that challenges the status quo.',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/help.webp'
    },
    {
      effect: 'flip_overlay_blur',
      title: 'Heaven Official’s Blessing',
      copy: 'An exiled prince ascends once more as a god, bound to a ghost king by fate and centuries of silent devotion.',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/tgcf.jpg'
    }
  ],
  zh: [
    {
      effect: 'bottom_slide_in',
      title: '綠山牆的安妮',
      copy: "'綠山牆的安妮' 是一個關於一位富有想像力且熱情的孤兒冒險與成長的溫馨故事。",
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/anne.jfif'
    },
    {
      effect: 'zoom-in',
      title: '可愛的骨頭',
      copy: "'可愛的骨頭' 講述一個年輕女孩在她的個人天堂中觀看家人和朋友如何應對她的悲劇性死亡的感人故事。",
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/bones.jpg'
    },
    {
      effect: 'hover_split',
      title: '冰與火之歌',
      copy: '貴族家族爭奪鐵王座，伴隨著龍、魔法、變幻的聯盟和冬天的陰影。',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/dragon.jpg'
    },
    {
      effect: 'page_turning',
      title: '獵魔士',
      copy: '獵魔士講述了里維亞的傑洛特，一位在充滿魔法和政治陰謀的動盪世界中狩獵怪物的故事。',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/the_witcher.jpg'
    },
    {
      effect: 'reveal_blur',
      title: '相助',
      copy: '1960年代密西西比州，三位女性跨越種族和社會隔閡，撰寫一本挑戰現狀的秘密書。',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/help.webp'
    },
    {
      effect: 'flip_overlay_blur',
      title: '天官賜福',
      copy: '一位被放逐的王子再次升天成神，與一位鬼王因命運和數世紀的無聲奉獻而相連。',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/tgcf.jpg'
    }
  ],
  'zh-TW': [
    {
      effect: 'bottom_slide_in',
      title: '綠山牆的安妮',
      copy: "'綠山牆的安妮' 是一個關於一位富有想像力且熱情的孤兒冒險與成長的溫馨故事。",
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/anne.jfif'
    },
    {
      effect: 'zoom-in',
      title: '可愛的骨頭',
      copy: "'可愛的骨頭' 講述一個年輕女孩在她的個人天堂中觀看家人和朋友如何應對她的悲劇性死亡的感人故事。",
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/bones.jpg'
    },
    {
      effect: 'hover_split',
      title: '冰與火之歌',
      copy: '貴族家族爭奪鐵王座，伴隨著龍、魔法、變幻的聯盟和冬天的陰影。',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/dragon.jpg'
    },
    {
      effect: 'page_turning',
      title: '獵魔士',
      copy: '獵魔士講述了里維亞的傑洛特，一位在充滿魔法和政治陰謀的動盪世界中狩獵怪物的故事。',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/the_witcher.jpg'
    },
    {
      effect: 'reveal_blur',
      title: '相助',
      copy: '1960年代密西西比州，三位女性跨越種族和社會隔閡，撰寫一本挑戰現狀的秘密書。',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/help.webp'
    },
    {
      effect: 'flip_overlay_blur',
      title: '天官賜福',
      copy: '一位被放逐的王子再次升天成神，與一位鬼王因命運和數世紀的無聲奉獻而相連。',
      image: 'https://raw.githubusercontent.com/ooBean/AssetHub/main/portfolio/tgcf.jpg'
    }
  ]
};