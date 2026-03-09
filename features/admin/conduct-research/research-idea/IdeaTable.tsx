import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import ButtonLoader from '@/components/ui/button-loader'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import Link from 'next/link'
import { AlertError } from '@/components/ui/alert-error'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { View } from 'lucide-react'
import { formateDate } from '@/lib/format'
import { useResearchIdea } from './idea.hooks'

const IdeaTable = ({ search }: { search: string }) => {

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { data, isLoading, error } = useResearchIdea()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300) 
    return () => clearTimeout(timer)
  }, [search])

  const isSearchingNews = search !== debouncedSearch;

  if (isLoading || isSearchingNews) return <p>Applications Loading</p>
  if (error instanceof Error) return <AlertError message={error.message}/>
  if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No applications submitted yet</p>
    
  const filtered = data?.filter((news) =>
      news.title.toLowerCase().includes(search.toLowerCase())
  )

  if (!filtered?.length) return <p className='flex items-center justify-center text-base'>Application not found</p>
    
  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
        <Table>
          <TableHeader>
              <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Affiliation</TableHead>
                  <TableHead>Research Area</TableHead>
              </TableRow>
          </TableHeader>
        <TableBody>
            {filtered?.map((idea) => (
                <TableRow key={idea._id}>
                    <TableCell>{idea.title} {idea.name}</TableCell>
                    <TableCell>{idea.designation}</TableCell>
                    <TableCell>{idea.affiliation}</TableCell>
                    <TableCell>{idea.categoryId.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
    
  )
}

export default IdeaTable