
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useSubmissions, useDeleteSubmission} from "./submission.hooks"
import UpdatePublishStatus from "./UpdatePublishStatus"
import UpdateSubmissionStatus from "./UpdateSubmissionStatus"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import ButtonLoader from "@/components/ui/button-loader"
import { SubmissionTableSkeleton } from "./Skeleton"
import { AlertError } from "@/components/ui/alert-error"
import StatusBadge from "@/components/ui/status-badge"
import { Download } from "lucide-react"

const SubmissionTable = ({ search }: { search: string }) => {

  const { data, isLoading, error } = useSubmissions()
  const [deletingId, setDeletingId] = useState<string | null>(null)
       const [isSearchingSubmission, setIsSearchingSubmission] = useState(false)
  const deleteMutation = useDeleteSubmission(setDeletingId)
   useEffect(() => {
        if (!search) return
      
        setIsSearchingSubmission(true)
        const timer = setTimeout(() => {
          setIsSearchingSubmission(false)
        }, 300) // debounce duration (UX sweet spot)
      
        return () => clearTimeout(timer)
      }, [search])

      const filtered = data?.filter((submission) =>
        submission.title.toLowerCase().includes(search.toLowerCase())
    )
  if (isLoading || isSearchingSubmission) return <SubmissionTableSkeleton/>
  if (error instanceof Error) return <AlertError message={error.message}/>
  if (!data || data.length === 0) return <p>No submissions, create one</p>

  

    if (!filtered?.length) return <div>No submission found</div>
  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden '>
     
      <Table className="min-w-max">
      <TableHeader>
        <TableRow>
          <TableHead>Author</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>File</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Update</TableHead>
          <TableHead>Live</TableHead>
          <TableHead>Access</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Updated</TableHead> 
          <TableHead>Publish</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((submission) => (
          <TableRow key={submission._id}>
            <TableCell>{submission.userName}</TableCell>
            <TableCell>{submission.title}</TableCell>
             <TableCell>{submission.categoryId.name}</TableCell>
            <TableCell>

              <Link href={submission.fileUrl} target="_blank"><Download /></Link>
            </TableCell>
            <TableCell>
              <StatusBadge status={submission.status}/>
            </TableCell>
            <TableCell>
              <UpdateSubmissionStatus id={submission._id} currentStatus={submission.status}/>
            </TableCell>
            <TableCell>{submission.isPublished === true ? "Yes" : "No"}</TableCell>
            <TableCell>{submission.accessLevel}</TableCell>
            <TableCell>{submission.createdAt}</TableCell>
            <TableCell>{submission.updatedAt}</TableCell>
            <TableCell>
              <UpdatePublishStatus id={submission._id} />
            </TableCell>
            <TableCell>
              <ConfirmDialog
                onConfirm={() => deleteMutation.mutate(submission._id)}
                disabled={deletingId === submission._id}
                triggerText={
                  deletingId === submission._id ? <ButtonLoader text="Deleting" /> : "Delete"
                }
              />
            </TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    
  )
}

export default SubmissionTable