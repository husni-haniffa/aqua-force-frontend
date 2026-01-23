import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import ButtonLoader from '@/components/ui/button-loader'
import { useDeleteNews, useNews } from './news.hooks'
import { Button } from '@/components/ui/button'
import EditNewsForm from './EditNewsForm'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { NewsTableSkeleton } from './Skeleton'
import Link from 'next/link'
import { AlertError } from '@/components/ui/alert-error'

const NewsTable = ({ search }: { search: string }) => {

    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const { data, isLoading, error } = useNews()
    const deleteMutation = useDeleteNews(setDeletingId)

    if (isLoading) return <NewsTableSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>
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
              <ConfirmDialog
                onConfirm={() => deleteMutation.mutate(news._id)}
                disabled={deletingId === news._id}
                triggerText={
                  deletingId === news._id ? <ButtonLoader text="Deleting" /> : "Delete"
                }
              />
            </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default NewsTable