import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from "@/components/ui/skeleton"

export const SubmissionTableSkeleton = () => {
  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
      <Table>
      <TableHeader>
        <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>View</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update</TableHead>
              <TableHead>Live</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Updated</TableHead> 
              <TableHead>Publish</TableHead>
              <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-8" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-8" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-15" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-10 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-8" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-15" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-18" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-10 w-15" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-10 w-15" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    
  )
}

