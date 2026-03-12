import { ResearchIdea } from "@/features/public/conduct-research/research-idea/types"
import { BASE_URL } from "@/types/api"

export const createResearchIdea = async (data: any) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-idea`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Network request failed")
    }
    return result
}

export const fetchResearchIdea = async (token: string): Promise<ResearchIdea[]> => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-idea`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Network request failed")
    }
    return result.data
}

export const deleteResearchIdea = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-idea/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Network request failed")
    }
    return result
}