import { useState } from 'react'
import { useSubmissionByUserId } from './submission.hooks'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import EditSubmissionForm from './EditSubmissionForm'

const SubmissiosCard = ({ search }: { search: string }) => {

    const [editingId, setEditingId] = useState<string | null>(null)
    const { data, isLoading, error } = useSubmissionByUserId()
        
    if (isLoading) return <p>Loading...</p>
    if (error instanceof Error) return <p>{error.message}</p>
    if (!data || data.length === 0) return <p>No Submissions</p>
        
    const filtered = data?.filter((submission) =>
        submission.title.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <div>No submissions found</div>

  return (
    <div className='grid grid-cols-1'>
        {data.map((submission) => (
                <Card key={submission._id}>
                    <CardHeader>
                        <CardTitle>{submission.title}</CardTitle>
                        <CardDescription className='flex flex-wrap justify-between items-center'>
                            By Husni Haniffa
                            <Badge>Approved</Badge>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex items-center gap-6'>
                        <Badge>Approved</Badge>
                        <Button onClick={() => window.open(submission.fileUrl, '_blank')}>
                            <ArrowDown />
                        </Button>
                    </CardContent>
                    <CardFooter>
                         <Dialog open={editingId === submission._id} onOpenChange={(open) => setEditingId(open ? submission._id : null)}>
                            <DialogTrigger asChild>
                                <Button>Edit</Button>
                            </DialogTrigger>
                            <DialogHeader className='sr-only'>
                                <DialogTitle></DialogTitle>
                            </DialogHeader>
                            <DialogContent>
                                <EditSubmissionForm submissionId={submission._id} onSuccess={() => setEditingId(null)} />
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            ))}
    </div>
  )
}

export default SubmissiosCard