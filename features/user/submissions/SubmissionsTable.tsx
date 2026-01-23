import { useState } from 'react'
import { useSubmissionByUserId } from './submission.hooks'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import EditSubmissionForm from './EditSubmissionForm'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { AlertError } from '@/components/ui/alert-error'
import { SubmissionTableSkeleton } from './Skeleton'

const SubmissionsTable = ({ search }: { search: string }) => {

    const [editingId, setEditingId] = useState<string | null>(null)
    const { data, isLoading, error } = useSubmissionByUserId()
        
    if (isLoading) return <SubmissionTableSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>
    if (!data || data.length === 0) return <p>No Submissions</p>
        
    const filtered = data?.filter((submission) =>
        submission.title.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <div>No submissions found</div>


  return (
     <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Published</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filtered?.map((submission) => (
                <TableRow key={submission._id}>
                    <TableCell>{submission.title}</TableCell>
                    <TableCell>{submission.categoryId.name}</TableCell>
                    <TableCell>{submission.status}</TableCell>
                    <TableCell>
                        <Link href={submission.fileUrl} target='_blank'>Download</Link>
                    </TableCell>
                    <TableCell>{submission.createdAt}</TableCell>
                    <TableCell>{submission.updatedAt}</TableCell>
                     <TableCell>
                        <Dialog open={editingId === submission._id} onOpenChange={(open) => setEditingId(open ? submission._id : null)}>
                            <DialogTrigger asChild>
                                <Button  disabled={editingId === submission._id}>Edit</Button>
                            </DialogTrigger>
                            <DialogHeader className='sr-only'>
                                <DialogTitle></DialogTitle>
                            </DialogHeader>
                            <DialogContent>
                                <EditSubmissionForm submissionId={submission._id} onSuccess={() => setEditingId(null)} />
                            </DialogContent>
                        </Dialog>
                    </TableCell>
                    <TableCell>{submission.isPublished ? "Yes" : "No"}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default SubmissionsTable