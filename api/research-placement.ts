
import { ResearchPlacements } from "@/features/public/conduct-research/research-placements/types"
import { BASE_URL } from "@/types/api"

export const createResearchPlacement = async (data: any) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-placement`, {
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

export const fetchResearchPlacement = async (token: string): Promise<ResearchPlacements[]> => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-placement`, {
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