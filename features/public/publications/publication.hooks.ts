import { useQuery } from "@tanstack/react-query"
import { fetchPublicationById, fetchPublications } from "./publication.api"
import { PublicationResponse } from "./publication.types"

export function usePublications() {
    return useQuery({
        queryKey: ["publications"],
        queryFn: fetchPublications
    })
}

export function usePublicationById(id: string) {
    return useQuery<PublicationResponse>({
        queryKey: ["publications", id],
        enabled: !!id,
        queryFn: () => fetchPublicationById(id),
    })
}
