import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const WaitlistHeader = ({ onSearch }: { onSearch: (value: string) => void }) => {



  return (
    <div className="flex justify-center">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search by email..."
          className="pl-10 bg-white focus-visible:bg-white border-blue-500 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 transition-all"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  )
}

export default WaitlistHeader