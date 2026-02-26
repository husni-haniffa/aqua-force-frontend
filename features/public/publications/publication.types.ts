import { Variant } from "framer-motion"

export interface PublicationResponse {
    _id: string
    userId: string
    userName: string
    researchTypeId: {
        _id: string
        name: string
    }
    categoryId: {
        _id: string
        name: string
    }
    title: string
    abstract: string
    keywords: Array<string>
    filePath: string
    accessLevel: string
    socialMediaLinks?: {
        youtube?: string
        facebook?: string
        instagram?: string
        twitter?: string
        linkedin?: string
    }
    updatedAt: Date
}

export interface PublicationCardProps {
    publication: PublicationResponse
    variants?: Variant
}