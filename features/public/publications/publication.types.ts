export interface PublicationResponse {
    _id: string
    userId: string
    userName: string
    categoryId: {
        _id: string
        name: string
    }
    title: string
    abstract: string
    keywords: Array<string>
    filePath: string
    accessLevel: string
    updatedAt: Date
}