import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { useCategories, useDeleteCategory } from './category.hooks'
import { Button } from '@/components/ui/button'
import EditCategoryForm from './EditCategoryForm'
import ButtonLoader from '@/components/ui/button-loader'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { CategoryTableSkeleton } from './Skeleton'
import { AlertError } from '@/components/ui/alert-error'

const CategoryTable = ({ search }: { search: string }) => {

    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const { data, isLoading, error } = useCategories()
    const deleteMutation = useDeleteCategory(setDeletingId)

    if (isLoading) return <CategoryTableSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>
    if (!data || data.length === 0) return <p>No categories, create one</p>
    
    const filtered = data?.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <div>No categories found</div>
    
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filtered?.map((category) => (
                <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.createdAt}</TableCell>
                    <TableCell>{category.updatedAt}</TableCell>
                    <TableCell>
                        <Dialog open={editingId === category._id} onOpenChange={(open) => setEditingId(open ? category._id : null)}>
                            <DialogTrigger asChild>
                                <Button disabled={deletingId === category._id}>Edit</Button>
                            </DialogTrigger>
                            <DialogHeader className='sr-only'>
                                <DialogTitle></DialogTitle>
                            </DialogHeader>
                            <DialogContent>
                                <EditCategoryForm categoryId={category._id} onSuccess={() => setEditingId(null)} />
                            </DialogContent>
                        </Dialog>
                    </TableCell>
                    <TableCell>
              <ConfirmDialog
                onConfirm={() => deleteMutation.mutate(category._id)}
                disabled={deletingId === category._id}
                triggerText={
                  deletingId === category._id ? <ButtonLoader text="Deleting" /> : "Delete"
                }
              />
            </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default CategoryTable