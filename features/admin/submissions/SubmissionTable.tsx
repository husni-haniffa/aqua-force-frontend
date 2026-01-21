
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useSubmissions } from "./submission.hooks"
import StatusUpdate from "./StatusUpdate"
import PublishSelect from "./PublishSelect"
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
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>AccessLevel</TableHead>
          <TableHead>Publish</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((submission) => (
<TableRow key={submission._id}>
          <TableCell>{submission._id}</TableCell>
          <TableCell>{submission.title}</TableCell>
          <TableCell>{submission.abstract}</TableCell>
          <TableCell>{submission.status}</TableCell>
          <TableCell>{submission.isPublished ? "Yes" : "No"}</TableCell>
          <TableCell>{submission.accessLevel}</TableCell>
          <TableCell><StatusUpdate
  id={submission._id}
  currentStatus={submission.status}
/></TableCell>
          <TableCell>No</TableCell>
          <TableCell>Public</TableCell>
          <TableCell>
            <PublishSelect id={submission._id} />
          </TableCell>
        </TableRow>
        ))}
        
      </TableBody>
    </Table>
  )
}

export default SubmissionTable