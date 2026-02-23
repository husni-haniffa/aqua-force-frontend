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
import { Download, View, Plus, Edit } from "lucide-react"
import SubmissionView from "./SubmissionView"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
import AddSocialMediaLinks from "./AddSocialMediaLinks"
import EditSocialMediaLinks from "./EditSocialMediaLinks"

const SubmissionTable = ({ search }: { search: string }) => {

  const { data, isLoading, error } = useSubmissions()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [addingSocialMediaId, setAddingSocialMediaId] = useState<string | null>(null)
  const [editingSocialMediaId, setEditingSocialMediaId] = useState<string | null>(null)
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const deleteMutation = useDeleteSubmission(setDeletingId)

  useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(search)
      }, 300) 
      return () => clearTimeout(timer)
    }, [search])

  const isSearchingSubmission = search !== debouncedSearch;

  const filtered = data?.filter((submission) =>
      submission.title.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading || isSearchingSubmission) return <SubmissionTableSkeleton/>
  if (error instanceof Error) return <AlertError message={error.message}/>
  if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No submissions, create one</p>

  if (!filtered?.length) return <p className='flex items-center justify-center text-base'>No submission found</p>

  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden '>
      <Table className="min-w-max">
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>View</TableHead>
            <TableHead>File</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>Live</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Social Media</TableHead>
            <TableHead>Updated</TableHead> 
            <TableHead>Publish</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell>{submission.userName}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                      <Button size={'icon'} variant={'secondary'}>
                        <View/>
                      </Button>
                  </DialogTrigger>
                  <DialogHeader className='sr-only'>
                      <DialogTitle></DialogTitle>
                  </DialogHeader>
                  <DialogContent>
                      <SubmissionView submission={submission}/>
                  </DialogContent>
                </Dialog>
              </TableCell>
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
              <TableCell>
                <div className="flex gap-2">
                  <Dialog open={addingSocialMediaId === submission._id} onOpenChange={(open) => setAddingSocialMediaId(open ? submission._id : null)}>
                    <DialogTrigger asChild>
                      <Button disabled={deletingId === submission._id} size={'sm'} variant={'add'}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogHeader className='sr-only'>
                      <DialogTitle>Add Social Media Links</DialogTitle>
                    </DialogHeader>
                    <DialogContent className="max-w-2xl">
                      <AddSocialMediaLinks 
                        submissionId={submission._id} 
                        onSuccess={() => setAddingSocialMediaId(null)} 
                      />
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={editingSocialMediaId === submission._id} onOpenChange={(open) => setEditingSocialMediaId(open ? submission._id : null)}>
                    <DialogTrigger asChild>
                      <Button disabled={deletingId === submission._id} size={'sm'} variant={'edit'}>
                        <Edit/>
                      </Button>
                    </DialogTrigger>
                    <DialogHeader className='sr-only'>
                      <DialogTitle>Edit Social Media Links</DialogTitle>
                    </DialogHeader>
                    <DialogContent className="max-w-2xl">
                      <EditSocialMediaLinks 
                        submissionId={submission._id} 
                        initialData={submission.socialMediaLinks}
                        onSuccess={() => setEditingSocialMediaId(null)} 
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
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