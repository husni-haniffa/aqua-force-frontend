import { ResearchPlacements } from "@/features/public/conduct-research/research-placements/types"
import { BASE_URL } from "@/types/api"
import { z } from "zod"
import { formSchema } from "@/features/public/conduct-research/research-placements/types"

type ResearchPlacementsRequest = z.infer<typeof formSchema>;

export const createResearchPlacement = async (data: ResearchPlacementsRequest) => {
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

export const deleteResearchPlacement = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-placement/${id}`, {
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