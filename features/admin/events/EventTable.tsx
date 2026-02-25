import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import ButtonLoader from '@/components/ui/button-loader'
import { useDeleteEvent, useEvents } from './event.hooks'
import EditEventForm from './EditEventForm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { EventTableSkeleton } from './Skeleton'
import { AlertError } from '@/components/ui/alert-error'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import EventView from './EventView'
import { View } from 'lucide-react'
import Link from 'next/link'

const EventTable = ({ search }: { search: string }) => {

    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const { data, isLoading, error } = useEvents()
    const deleteMutation = useDeleteEvent(setDeletingId)

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(search)
      }, 300) 
      return () => clearTimeout(timer)
    }, [search])

    const isSearchingEvent = search !== debouncedSearch;

    if (isLoading || isSearchingEvent) return <EventTableSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>
    if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No events, create one</p>
    
    const filtered = data?.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <p className='flex items-center justify-center text-base'>No events found</p>
    
  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>View</TableHead>  
                <TableHead>Updated</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filtered?.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.title}</TableCell>
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
                          <EventView event={event}/>
                      </DialogContent>
                    </Dialog>
                  </TableCell>                  
                  <TableCell>{event.updatedAt}</TableCell>
                  <TableCell>
                      <Link href={`/admin/events/${event._id}/edit`}>
                        <Button size="sm" variant={'edit'}>
                            Edit
                        </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <ConfirmDialog
                      onConfirm={() => deleteMutation.mutate(event._id)}
                      disabled={deletingId === event._id}
                      triggerText={
                        deletingId === event._id ? <ButtonLoader text="Deleting" /> : "Delete"
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

export default EventTable