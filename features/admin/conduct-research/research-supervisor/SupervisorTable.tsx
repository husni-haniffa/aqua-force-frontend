import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import ButtonLoader from '@/components/ui/button-loader'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { AlertError } from '@/components/ui/alert-error'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { View } from 'lucide-react'
import { useDeleteResearcSupervisor, useResearchSupervisor } from './supervisor.hooks'
import SupervisorView from './SupervisorView'
import { SupervisorTableSkeleton } from './Skeleton'

const SupervisorTable = ({ search }: { search: string }) => {

      const [deletingId, setDeletingId] = useState<string | null>(null)

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { data, isLoading, error } = useResearchSupervisor()
      const deleteMutation = useDeleteResearcSupervisor(setDeletingId)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300) 
    return () => clearTimeout(timer)
  }, [search])

  const isSearchingSupervisor = search !== debouncedSearch;

  if (isLoading || isSearchingSupervisor) return <SupervisorTableSkeleton/>
  if (error instanceof Error) return <AlertError message={error.message}/>
  if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No applications submitted yet</p>
  
  const filtered = data?.filter((supervisor) =>
      supervisor.name.toLowerCase().includes(search.toLowerCase())
  )

  if (!filtered?.length) return <p className='flex items-center justify-center text-base'>Application not found</p>
  
  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
        <Table>
          <TableHeader>
              <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Affiliation</TableHead>
                  <TableHead>No of Students</TableHead>
                  <TableHead>Research Area</TableHead>
                  <TableHead>More Info</TableHead>
                  <TableHead>Delete</TableHead>
              </TableRow>
          </TableHeader>
        <TableBody>
            {filtered?.map((idea) => (
                <TableRow key={idea._id}>
                    <TableCell>
                                          <span className='text-xs mr-1 font-bold'>{idea.title}.</span>
                                          {idea.name}
                                        </TableCell>
                                            <TableCell>{idea.degree}</TableCell>
                    <TableCell>{idea.designation}</TableCell>
                    <TableCell>{idea.affiliation}</TableCell>
                    <TableCell>{idea.noOfStudents}</TableCell>
                    <TableCell>{idea.categoryId.name}</TableCell>
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
                            <SupervisorView data={idea}/>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                        <ConfirmDialog
                            onConfirm={() => deleteMutation.mutate(idea._id)}
                            disabled={deletingId === idea._id}
                            triggerText={
                            deletingId === idea._id ? <ButtonLoader text="Deleting" /> : "Delete"
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

export default SupervisorTable
