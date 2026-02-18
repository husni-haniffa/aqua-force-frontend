import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { AlertError } from '@/components/ui/alert-error'
import { useWaitlist } from './waitlist.hooks'
import { formateDate } from '@/lib/format'
import { WaitlistTableSkeleton } from './Skeleton'

const WaitlistTable = ({ search }: { search: string }) => {

    const { data, isLoading, error } = useWaitlist()
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(search)
      }, 300) 
      return () => clearTimeout(timer)
    }, [search])

    const isSearchingWaitlist = search !== debouncedSearch;
   
    if (isLoading || isSearchingWaitlist) return <WaitlistTableSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>
    if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No applicants</p>
    
    const filtered = data?.filter((waitlist) =>
        waitlist.email.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <p className='flex items-center justify-center text-base'>No applicant found</p>
    
  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Joined</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filtered?.map((waitlist) => (
                <TableRow key={waitlist.userId}>
                    <TableCell>{waitlist.firstName}</TableCell>
                    <TableCell>{waitlist.lastName}</TableCell>
                    <TableCell>{waitlist.email}</TableCell>
                    <TableCell>{waitlist.phoneNumber}</TableCell>
                    <TableCell>{formateDate(waitlist.createdAt)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </div>
    
  )
}

export default WaitlistTable