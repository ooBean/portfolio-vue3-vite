import http from '@/utils/http'
import type { UnsplashResponse } from '@/types/unsplash'

// 更新 http 实例的 baseURL
http.defaults.baseURL = 'https://api.unsplash.com'

interface GetImagesParams {
  query: string
  page?: number
  perPage?: number
}

/**
 * 获取 Unsplash 图片列表
 */
export const getImages = async ({ query, page = 1, perPage = 20 }: GetImagesParams) => {
  try {
    const response = await http.get<UnsplashResponse>('/search/photos', {
      params: {
        query,
        page,
        per_page: perPage
      },
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      }
    })
    return response.data
  } catch (error) {
    console.error('获取图片失败:', error)
    throw error
  }
}