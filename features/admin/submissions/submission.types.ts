
type Status = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED'
export interface SubmissionResponse {
    _id: string
    userId: string
    userName: string
    categoryId: {
        _id: string
        name: string
    }
    title: string
    abstract: string
    fileUrl: string
    status: Status
    isPublished: boolean
    accessLevel: string
    createdAt: string
    updatedAt: string
}