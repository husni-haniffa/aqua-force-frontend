"use client"
import { useEffect, useState } from 'react'
import { useSubmissionByUserId } from './submission.hooks'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { AlertError } from '@/components/ui/alert-error'
import { SubmissionTableSkeleton } from './Skeleton'
import StatusBadge from '@/components/ui/status-badge'

const SubmissionsTable = ({ search }: { search: string }) => {

    const { data, isLoading, error } = useSubmissionByUserId()
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
          const timer = setTimeout(() => {
            setDebouncedSearch(search)
          }, 300) 
          return () => clearTimeout(timer)
        }, [search])
    
    const isSearchingSubmission = search !== debouncedSearch;
    
    if (isLoading || isSearchingSubmission) return <SubmissionTableSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>
    if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No Submissions</p>
        
    const filtered = data?.filter((submission) =>
        submission.title.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <p className='flex items-center justify-center text-base'>No submission found</p>

  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
         <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Live</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filtered?.map((submission) => (
                <TableRow key={submission._id}>
                    <TableCell>{submission.title}</TableCell>
                    <TableCell>{submission.categoryId.name}</TableCell>
                    <TableCell> <StatusBadge status={submission.status}/></TableCell>
                    <TableCell>
                        <Link href={submission.fileUrl} target='_blank'>
                            <Download/>
                        </Link>
                    </TableCell>
                    <TableCell>{submission.createdAt}</TableCell>
                    <TableCell>{submission.updatedAt}</TableCell>
                     <TableCell>
                        <Link href={`/user/submissions/${submission._id}/edit`}>
                            <Button size="sm" variant={'edit'}>
                                Edit
                            </Button>
                        </Link>
                    </TableCell>
                    <TableCell>{submission.isPublished ? "Yes" : "No"}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </div>
    
  )
}

export default SubmissionsTable