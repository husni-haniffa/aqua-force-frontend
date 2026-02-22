import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { useResearchTypes, useDeleteResearchType } from './research-type.hooks'
import { Button } from '@/components/ui/button'
import EditCategoryForm from './EditResearchTypeForm'
import ButtonLoader from '@/components/ui/button-loader'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { ResearchTypeTableSkeleton } from './Skeleton'
import { AlertError } from '@/components/ui/alert-error'

const ResearchTypeTable = ({ search }: { search: string }) => {

    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const { data, isLoading, error } = useResearchTypes()
    const deleteMutation = useDeleteResearchType(setDeletingId)
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(search)
      }, 300) 
      return () => clearTimeout(timer)
    }, [search])

    const isSearchingCategory = search !== debouncedSearch;
   
    if (isLoading || isSearchingCategory) return <ResearchTypeTableSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>
    if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No research types, create one</p>
    
    const filtered = data?.filter((researchType) =>
        researchType.name.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <p className='flex items-center justify-center text-base'>No research type found</p>
    
  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filtered?.map((researchType) => (
                <TableRow key={researchType._id}>
                    <TableCell>{researchType.name}</TableCell>
                    <TableCell>{researchType.createdAt}</TableCell>
                    <TableCell>{researchType.updatedAt}</TableCell>
                    <TableCell>
                        <Dialog open={editingId === researchType._id} onOpenChange={(open) => setEditingId(open ? researchType._id : null)}>
                            <DialogTrigger asChild>
                                <Button disabled={deletingId === researchType._id} size={'sm'} variant={'edit'}>Edit</Button>
                            </DialogTrigger>
                            <DialogHeader className='sr-only'>
                                <DialogTitle></DialogTitle>
                            </DialogHeader>
                            <DialogContent>
                                <EditCategoryForm researchTypeId={researchType._id} onSuccess={() => setEditingId(null)} />
                            </DialogContent>
                        </Dialog>
                    </TableCell>
                    <TableCell>
                        <ConfirmDialog
                            onConfirm={() => deleteMutation.mutate(researchType._id)}
                            disabled={deletingId === researchType._id}
                            triggerText={
                            deletingId === researchType._id ? <ButtonLoader text="Deleting" /> : "Delete"
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

export default ResearchTypeTable