
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useSubmissions, useDeleteSubmission} from "./submission.hooks"
import UpdatePublishStatus from "./UpdatePublishStatus"
import UpdateSubmissionStatus from "./UpdateSubmissionStatus"
import Link from "next/link"
import { useState } from "react"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import ButtonLoader from "@/components/ui/button-loader"
import { SubmissionTableSkeleton } from "./Skeleton"
import { AlertError } from "@/components/ui/alert-error"

const SubmissionTable = ({ search }: { search: string }) => {

  const { data, isLoading, error } = useSubmissions()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const deleteMutation = useDeleteSubmission(setDeletingId)
  if (isLoading) return <SubmissionTableSkeleton/>
  if (error instanceof Error) return <AlertError message={error.message}/>
  if (!data || data.length === 0) return <p>No submissions</p>

      const filtered = data?.filter((submission) =>
        submission.title.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <div>No categories found</div>
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Submitted By</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>File</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Move To</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>AccessLevel</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead> 
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
              <Link href={submission.fileUrl} target="_blank">Download</Link>
            </TableCell>
            <TableCell>{submission.status}</TableCell>
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
  )
}

export default SubmissionTable