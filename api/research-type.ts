

import { ResearchTypeRequest, ResearchTypeResponse } from "@/features/admin/research-types/research-type.types";
import { BASE_URL } from "@/types/api";

export const fetchResearchTypes = async (token: string): Promise<ResearchTypeResponse[]> => {
    const response = await fetch(`${BASE_URL}/research-types`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch research types')
    }
    return result.data
}

export const fetchResearchTypeById = async (id: string, token: string): Promise<ResearchTypeResponse> => {
    const response = await fetch(`${BASE_URL}/research-types/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch research type with id')
    }
    return result.data
}

export const createResearchType = async (data: ResearchTypeRequest, token: string) => {
    const response = await fetch(`${BASE_URL}/research-types`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create research type")
    }
    return result
}

export const updateResearchType = async ({ id, data, token }: { id: string, data: ResearchTypeRequest, token: string}): Promise<ResearchTypeResponse> => {
    const response = await fetch(`${BASE_URL}/research-types/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to update research types")
    }
    return result.data
}

export const deleteResearchType = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/research-types/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create research types")
    }
    return result
}