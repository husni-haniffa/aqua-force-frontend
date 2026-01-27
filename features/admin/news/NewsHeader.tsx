import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Link from 'next/link'

const NewsHeader = ({ onSearch }: { onSearch: (value: string) => void }) => {

  return (
    <div className="flex items-center justify-between gap-">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search by news title..."
          className="pl-10 bg-white border-blue-500 focus-visible:bg-white focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 transition-all"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Link href="/admin/news/create">
        <Button size="lg" variant={'add'}>Add News</Button>
      </Link>
    </div>
  )
}

export default NewsHeader