import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import ButtonLoader from '@/components/ui/button-loader'
import { useDeleteNews, useNews } from './news.hooks'
import { Button } from '@/components/ui/button'
import EditNewsForm from './EditNewsForm'

const NewsTable = ({ search }: { search: string }) => {

    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const { data, isLoading, error } = useNews()
    const deleteMutation = useDeleteNews(setDeletingId)

    if (isLoading) return <p>Loading...</p>
    if (error instanceof Error) return <p>{error.message}</p>
    if (!data || data.length === 0) return <p>No news</p>
    
    const filtered = data?.filter((news) =>
        news.title.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <div>No news found</div>
    
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filtered?.map((news) => (
                <TableRow key={news._id}>
                    <TableCell>{news.title}</TableCell>
                    <TableCell>{news.content}</TableCell>
                    <TableCell>{news.createdAt}</TableCell>
                    <TableCell>{news.updatedAt}</TableCell>
                    <TableCell>
                        <Dialog open={editingId === news._id} onOpenChange={(open) => setEditingId(open ? news._id : null)}>
                            <DialogTrigger asChild>
                                <Button  disabled={deletingId === news._id}>Edit</Button>
                            </DialogTrigger>
                            <DialogHeader className='sr-only'>
                                <DialogTitle></DialogTitle>
                            </DialogHeader>
                            <DialogContent>
                                <EditNewsForm newsId={news._id} onSuccess={() => setEditingId(null)} />
                            </DialogContent>
                        </Dialog>
                    </TableCell>
                    <TableCell>
                        <Button
                            variant="destructive"
                            onClick={() => deleteMutation.mutate(news._id)}
                            disabled={deletingId === news._id}
                        >
                            {deletingId === news._id
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

export default NewsTable