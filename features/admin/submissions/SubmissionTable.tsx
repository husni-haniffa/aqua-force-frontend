
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useSubmissions } from "./submission.hooks"
import UpdatePublishStatus from "./UpdatePublishStatus"
import UpdateSubmissionStatus from "./UpdateSubmissionStatus"

const SubmissionTable = () => {

  const { data, isLoading, error } = useSubmissions()
            
  if (isLoading) return <p>Loading...</p>
  if (error instanceof Error) return <p>{error.message}</p>
  if (!data || data.length === 0) return <p>No submissions</p>


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Submitted By</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Abstract</TableHead>
          <TableHead>File</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Move To</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>AccessLevel</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead> 
          <TableHead>Publish</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((submission) => (
          <TableRow key={submission._id}>
            <TableCell>{submission.userName}</TableCell>
            <TableCell>{submission.title}</TableCell>
            <TableCell>{submission.abstract}</TableCell>
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
        </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SubmissionTable