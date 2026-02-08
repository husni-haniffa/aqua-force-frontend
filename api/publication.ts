

import { PublicationResponse } from "@/features/public/publications/publication.types";
import { BASE_URL } from "@/types/api";

export const fetchPublications = async (): Promise<PublicationResponse[]> => {
    const response = await fetch(`${BASE_URL}/publications`)
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch publications')
    }
    return result.data
}

export const fetchPublicationById = async (id: string): Promise<PublicationResponse> => {
    const response = await fetch(`${BASE_URL}/publications/${id}`)
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch publications with id')
    }
    return result.data
}