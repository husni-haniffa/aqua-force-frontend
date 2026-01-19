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
import { EditCategoryForm } from '../forms/EditCategory'
import { useAuth } from '@clerk/nextjs'
import { SubmissionResponse } from '@/types/submission'
import { getAllSubmissions } from '@/api/submission'
import { ArrowDown } from 'lucide-react'

const Submission = () => {

    const [open, setOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { getToken } = useAuth()
    const { data, isLoading, error } = useQuery<SubmissionResponse[]>({
        queryKey: ["submissions"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return getAllSubmissions(token)
        }
    })
 
    const queryClient = useQueryClient()

//    const deleteMutation = useMutation({
//   mutationFn: async (id: string) => {
//     const token = await getToken()
//     if (!token) throw new Error("Not authenticated")

//     return deleteCategory(id, token)
//   },

//   onMutate: (id: string) => {
//     setDeletingId(id)
//   },

//   onSettled: () => {
//     setDeletingId(null)
//   },

//   onSuccess: () => {
//     toast.success(" deleted")
//     queryClient.invalidateQueries({ queryKey: ["categories"] })
//   },

//   onError: (err: any) => {
//     toast.error(err.message ?? "Delete failed")
//   },
// })

//     const handleDelete = (id: string) => {
//         deleteMutation.mutate(id)
//     }

    if (isLoading) return <p>Loading...</p>

    if (error instanceof Error) return <p>{error.message}</p>

    if (!data || data.length === 0) {
        return <p>No submissions found</p>
    }
    
    return (
        <div className='flex flex-col gap-16'>
            <div className='flex items-center justify-between gap-3'>
                <Input placeholder='Search for a category' className='w-96'/>
               
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
                        {data?.map((submission) => (
                            <TableRow key={submission._id}>
                                <TableCell>{submission.title}</TableCell>
              
                                <TableCell>{submission.status}</TableCell>
                                <TableCell>{submission.createdAt}</TableCell>
              
                                <TableCell>{submission.updatedAt}</TableCell>
                                <TableCell> <Button
  onClick={() => window.open(submission.fileUrl, '_blank')}
>
  <ArrowDown />
</Button></TableCell>
                                {/* <TableCell>{category.createdAt}</TableCell>
                                <TableCell>{category.updatedAt}</TableCell>
                                <TableCell>
                                    <Dialog open={editingId === category._id} 
                                        onOpenChange={(open) => setEditingId(open ? category._id : null)}>
                                        <DialogTrigger asChild>
                                            <Button>Edit</Button>
                                        </DialogTrigger>
                                        <DialogHeader className='sr-only'><DialogTitle></DialogTitle></DialogHeader>
                                        <DialogContent>
                                            <EditCategoryForm categoryId={category._id} onSuccess={() => setEditingId(null)} />
                                        </DialogContent>
                                    </Dialog>
                                </TableCell> */}
                                {/* <TableCell>
                                    <Button 
                                        variant={'destructive'} 
                                        onClick={() => handleDelete(category._id)} 
                                        disabled={deletingId === category._id}
                                    >
                                        {deletingId === category._id ? <ButtonLoader text="Deleting"/> : 'Delete'}
                                    </Button>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Submission