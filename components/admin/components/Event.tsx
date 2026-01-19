"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { EventForm } from '../forms/Event'
import { EventResponse } from '@/types/events'
import { deleteEvent, fetchEvents } from '@/api/event'
import { DialogTitle } from '@radix-ui/react-dialog'
import { toast } from 'sonner'
import ButtonLoader from '@/components/ui/button-loader'
import { EditEventForm } from '../forms/EditEvent'
import { useAuth } from '@clerk/nextjs'

const Event = () => {

    const [open, setOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { getToken } = useAuth()
    const { data, isLoading, error } = useQuery<EventResponse[]>({
        queryKey: ["events"],
         queryFn: fetchEvents,
    })

    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
           const token = await getToken()
           if (!token) throw new Error("Not authenticated")
       
           return deleteEvent(id, token)
         },
        onMutate: (id: string) => {
            setDeletingId(id);
        },
        onSettled: () => {
            setDeletingId(null);
        },
        onSuccess: () => {
            toast.success('Category deleted')
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            })  
        },
        onError: (err) => {
            toast.error(err.message)
        }
    }) 

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id)
    }

    if (isLoading) return <p>Loading...</p>

    if (error instanceof Error) return <p>{error.message}</p>
    
    return (
        <div>
            <div className='flex items-center justify-between gap-3'>
                <Input/>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Add Event</Button>
                    </DialogTrigger>
                    <DialogHeader className='sr-only'><DialogTitle></DialogTitle></DialogHeader>
                    <DialogContent>
                        <EventForm onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>title</TableHead>
                            <TableHead>descriptio</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>location</TableHead>
                            <TableHead>createdAt</TableHead>
                            <TableHead>updatedAt</TableHead>
                            <TableHead>Edit</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((event) => (
                            <TableRow key={event._id}>
                                <TableCell>{event._id}</TableCell>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.description}</TableCell>
                                <TableCell>{event.eventDate.toString()}</TableCell>
                                <TableCell>{event.eventTime}</TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>{event.createdAt}</TableCell>
                                <TableCell>{event.updatedAt}</TableCell>
                                <TableCell>
                                    <Dialog open={editingId === event._id} 
                                        onOpenChange={(open) => setEditingId(open ? event._id : null)}>
                                        <DialogTrigger asChild>
                                            <Button>Edit</Button>
                                        </DialogTrigger>
                                        <DialogHeader className='sr-only'><DialogTitle></DialogTitle></DialogHeader>
                                        <DialogContent>
                                            <EditEventForm eventId={event._id} onSuccess={() => setEditingId(null)} />
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant={'destructive'} 
                                        onClick={() => handleDelete(event._id)} 
                                        disabled={deletingId === event._id}
                                    >
                                    {deletingId === event._id ? <ButtonLoader text="deleting"/> : 'delete'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Event