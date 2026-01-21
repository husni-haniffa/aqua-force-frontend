import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ButtonLoader from '@/components/ui/button-loader'
import { useDeleteEvent, useEvents } from './event.hooks'
import EditEventForm from './EditEventForm'

const EventTable = ({ search }: { search: string }) => {

    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const { data, isLoading, error } = useEvents()
    const deleteMutation = useDeleteEvent(setDeletingId)

    if (isLoading) return <p>Loading...</p>
    if (error instanceof Error) return <p>{error.message}</p>
    if (!data || data.length === 0) return <p>No Events</p>
    
    const filtered = data?.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <div>No events found</div>
    
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filtered?.map((event) => (
                <TableRow key={event._id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell>{event.eventDate.toString()}</TableCell>
                    <TableCell>{event.eventTime}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.createdAt}</TableCell>
                    <TableCell>{event.updatedAt}</TableCell>
                    <TableCell>
                        <Dialog open={editingId === event._id} onOpenChange={(open) => setEditingId(open ? event._id : null)}>
                            <DialogTrigger asChild>
                                <Button disabled={deletingId === event._id}>Edit</Button>
                            </DialogTrigger>
                            <DialogHeader className='sr-only'>
                                <DialogTitle></DialogTitle>
                            </DialogHeader>
                            <DialogContent>
                                <EditEventForm eventId={event._id} onSuccess={() => setEditingId(null)} />
                            </DialogContent>
                        </Dialog>
                    </TableCell>
                    <TableCell>
                        <Button
                            variant="destructive"
                            onClick={() => deleteMutation.mutate(event._id)}
                            disabled={deletingId === event._id}
                        >
                            {deletingId === event._id
                            ? <ButtonLoader text="Deleting" />
                            : "Delete"}
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default EventTable