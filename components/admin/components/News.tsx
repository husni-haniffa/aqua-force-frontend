"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteNews, fetchNews } from '@/api/news'
import { NewsForm } from '../forms/News'
import { toast } from 'sonner'
import ButtonLoader from '@/components/ui/button-loader'
import { NewsResponse } from '@/types/news'
import { EditNewsForm } from '../forms/EditNews'

const News = () => {

    const [open, setOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
   
    const { data, isLoading, error } = useQuery<NewsResponse[]>({
        queryKey: ["news"],
        queryFn: fetchNews
    })

    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteNews,
        onMutate: (id: string) => {
            setDeletingId(id);
        },
        onSettled: () => {
            setDeletingId(null);
        },
        onSuccess: () => {
            toast.success('News deleted')
            queryClient.invalidateQueries({
                queryKey: ["news"]
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
                        <Button>Add News</Button>
                    </DialogTrigger>
                    <DialogHeader className='sr-only'><DialogTitle></DialogTitle></DialogHeader>
                    <DialogContent>
                        <NewsForm onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead>Edit</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((news) => (
                            <TableRow key={news._id}>
                                <TableCell>{news._id}</TableCell>
                                <TableCell>{news.title}</TableCell>
                                <TableCell 
                                    title={news.content} 
                                    className=" max-w-87.5 line-clamp-2">
                                        {news.content}
                                </TableCell>
                                <TableCell>{news.createdAt}</TableCell>
                                <TableCell>{news.updatedAt}</TableCell>
                                    <Dialog open={editingId === news._id} 
                                        onOpenChange={(open) => setEditingId(open ? news._id : null)}>
                                        <DialogTrigger asChild>
                                            <Button>Edit</Button>
                                        </DialogTrigger>
                                        <DialogHeader className='sr-only'><DialogTitle></DialogTitle></DialogHeader>
                                        <DialogContent>
                                            <EditNewsForm newsId={news._id} onSuccess={() => setEditingId(null)} />
                                        </DialogContent>
                                    </Dialog>
                                <TableCell>
                                    <Button 
                                        variant={'destructive'} 
                                        onClick={() => handleDelete(news._id)} 
                                        disabled={deletingId === news._id}
                                    >
                                    {deletingId === news._id ? <ButtonLoader text="deleting"/> : 'delete'}
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

export default News