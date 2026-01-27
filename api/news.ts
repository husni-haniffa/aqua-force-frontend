
import { NewsResponse } from "@/features/admin/news/news.types";
import { BASE_URL } from "@/types/api";

export const fetchNews = async (): Promise<NewsResponse[]> => {
    const response = await fetch(`${BASE_URL}/news`)
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch news')
    }
    return result.data
}

export const fetchNewsById = async (id: string): Promise<NewsResponse> => {
    const response = await fetch(`${BASE_URL}/news/${id}`)
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to news with id')
    }
    return result.data
}

export const createNews = async (formData: FormData, token: string) => {
    const response = await fetch(`${BASE_URL}/news`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create news")
    }
    return result
}

export const updateNews = async ({id, formData, token}: {id: string, formData: FormData, token: string}) => {
    const response = await fetch(`${BASE_URL}/news/${id}`, {
        method: "PUT",
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to update news")
    }
    return result.data
}

export const deleteNews = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/news/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to delete news")
    }
    return result
}