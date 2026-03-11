
import { ResearchFunding } from "@/features/public/conduct-research/research-funding/types"
import { BASE_URL } from "@/types/api"

export const createResearchFunding = async (data: any) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-funding`, {
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

export const fetchResearchFunding = async (token: string): Promise<ResearchFunding[]> => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-funding`, {
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

export const deleteResearchFunding = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-funding/${id}`, {
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