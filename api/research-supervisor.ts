

import { ResearchSupervisor } from "@/features/public/conduct-research/research-supervisor/types"
import { BASE_URL } from "@/types/api"

export const createResearchSupervisor = async (data: any) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-supervisor`, {
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

export const fetchResearchSupervisor = async (token: string): Promise<ResearchSupervisor[]> => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-supervisor`, {
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

export const deleteResearchSupervisor = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-supervisor/${id}`, {
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