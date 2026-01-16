"use client"
import { deleteCategory, fetchCategories } from '@/api/category'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { CategoryForm } from '../forms/Category'
import { CategoryResponse } from '@/types/category'
import { toast } from 'sonner'
import ButtonLoader from '@/components/ui/button-loader'

const Category = () => {

    const [open, setOpen] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null);
    
    const { data, isLoading, error } = useQuery<CategoryResponse[]>({
        queryKey: ["categories"],
        queryFn: fetchCategories
    })

    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteCategory,
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
        <div className='flex flex-col gap-16'>
            <div className='flex items-center justify-between gap-3'>
                <Input placeholder='Search for a category' className='w-96'/>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Add Category</Button>
                    </DialogTrigger>
                    <DialogHeader className='sr-only'><DialogTitle></DialogTitle></DialogHeader>
                    <DialogContent>
                        <CategoryForm onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead>Edit</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell>{category._id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.createdAt}</TableCell>
                                <TableCell>{category.updatedAt}</TableCell>
                                <TableCell>
                                    <Button>Edit</Button>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant={'destructive'} 
                                        onClick={() => handleDelete(category._id)} 
                                        disabled={deletingId === category._id}
                                    >
                                        {deletingId === category._id ? <ButtonLoader text="deleting"/> : 'delete'}
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

export default Category