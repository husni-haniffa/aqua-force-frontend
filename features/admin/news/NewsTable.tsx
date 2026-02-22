import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import ButtonLoader from '@/components/ui/button-loader'
import { useDeleteNews, useNews } from './news.hooks'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { NewsTableSkeleton } from './Skeleton'
import Link from 'next/link'
import { AlertError } from '@/components/ui/alert-error'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import NewsView from './NewsView'
import { View } from 'lucide-react'
import { formateDate } from '@/lib/format'

const NewsTable = ({ search }: { search: string }) => {

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { data, isLoading, error } = useNews()
  const deleteMutation = useDeleteNews(setDeletingId)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300) 
    return () => clearTimeout(timer)
  }, [search])

  const isSearchingNews = search !== debouncedSearch;

  if (isLoading || isSearchingNews) return <NewsTableSkeleton/>
  if (error instanceof Error) return <AlertError message={error.message}/>
  if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No news, create one</p>
    
  const filtered = data?.filter((news) =>
      news.title.toLowerCase().includes(search.toLowerCase())
  )

  if (!filtered?.length) return <p className='flex items-center justify-center text-base'>No news found</p>
    
  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
        <Table>
          <TableHeader>
              <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>View</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Edit</TableHead>
                  <TableHead>Delete</TableHead>
              </TableRow>
          </TableHeader>
        <TableBody>
            {filtered?.map((news) => (
                <TableRow key={news._id}>
                    <TableCell>{news.title}</TableCell>
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
                            <NewsView news={news}/>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>{formateDate(news.updatedAt)}</TableCell>
                    <TableCell>
                      <Link href={`/admin/news/${news._id}/edit`}>
                        <Button size="sm" variant={'edit'}>
                            Edit
                        </Button>
                    </Link>
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
    </div>
    
  )
}

export default NewsTable