import { NewsRequest, NewsResponse } from "@/types/news";
import { BASE_URL } from "@/types/api";

export const createNews = async (data: NewsRequest) => {
    const response = await fetch(`${BASE_URL}/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create news")
    }
    return result
}

export const fetchNews = async (): Promise<NewsResponse[]> => {
    const response = await fetch(`${BASE_URL}/news`)
    const result = await response.json()
    if(!response.ok){
        throw new Error(result.message || 'Failed to fetch news')
    }
    return result.data
}

export const deleteNews = async (id: string) => {
    const response = await fetch(`${BASE_URL}/news/${id}`, {
        method: 'DELETE',
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to delete event")
    }
    return result
}