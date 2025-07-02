
export type Language = 'en' | 'zh' | 'zh-TW';


export type Theme = 'theme-light' | 'theme-dark' | 'theme-warm';

export interface UnsplashImage {
  id: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  aspectRatio?: number;
  width: number
  height: number
  alt_description: string
  user: {
    name: string
    links: {
      html: string
    }
  }
}
export interface UnsplashResponse {
  total: number
  total_pages: number
  results: UnsplashImage[]
}