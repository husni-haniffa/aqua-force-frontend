"use client"
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { getSubmissionByUserId } from '@/api/submission'
import { toast } from 'sonner'
import { SubmissionResponse } from '@/types/submission'

const Submissions = () => {
    const { getToken, userId } = useAuth()

    const { data, isLoading, error } = useQuery<SubmissionResponse[]>({
        queryKey: ["submissions", userId],
        queryFn: async () => {
            if (!userId) {
                throw new Error("User not authenticated")
            }
            const token = await getToken()
            if (!token) {
                throw new Error("Not authenticated")
            }
            return getSubmissionByUserId(userId, token)
        },
        enabled: !!userId, // Only run query when userId exists
    })

    // Show error toast when query fails
    if (error) {
        toast.error(error.message)
    }

    if (isLoading) {
        return <p>Loading...</p> // Fixed: Added return statement
    }

    if (!data || data.length === 0) {
        return <p>No submissions found</p>
    }

    return (
        <div className="space-y-4">
            {data.map((submission) => (
                <Card key={submission._id}> {/* Added key prop */}
                    <CardHeader>
                        <CardTitle>{submission.title}</CardTitle>
                        <CardDescription className='flex flex-wrap justify-between items-center'>
                            By Husni Haniffa
                            <Badge>Approved</Badge>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex items-center gap-6'>
                        <Badge>Approved</Badge>
                        <Button
  onClick={() => window.open(submission.fileUrl, '_blank')}
>
  <ArrowDown />
</Button>

                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Submissions