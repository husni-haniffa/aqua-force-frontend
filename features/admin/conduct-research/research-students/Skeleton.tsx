import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const StudentsTableSkeleton = () => {
  return (
      <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>

        <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Affiliation</TableHead>
                <TableHead>Research Area</TableHead>
                <TableHead>Applied on</TableHead>
                <TableHead>More Info</TableHead>
                <TableHead>Delete</TableHead>
            </TableRow>
        </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-15" />
            </TableCell>
            <TableCell>
             <Skeleton className="h-5 w-15" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-15" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-15" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-15" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-12" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-12" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-12" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
   
  )
}
