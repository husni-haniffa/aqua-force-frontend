import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const SubmissionFormSkeleton = () => {
  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-7 w-44" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">

          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-32 w-full" />
          </div>
          
       
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </CardFooter>
    </Card>
  )
}

export const SubmissionTableSkeleton = () => {
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
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-48" /> {/* Title - wider */}
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-32" /> {/* Category */}
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-24" /> {/* Status - badge height */}
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-20" /> {/* File - button height */}
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-28" /> {/* Created At - date */}
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-28" /> {/* Updated At - date */}
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-16" /> {/* Edit - button */}
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-16" /> {/* Published - badge/switch */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

