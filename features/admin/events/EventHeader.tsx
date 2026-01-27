import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CreateEventForm from './CreateEventForm'
import { Search } from 'lucide-react'

const EventHeader = ({ onSearch }: { onSearch: (value: string) => void }) => {

  const [open, setOpen] = useState(false)

  return (
     <div className="flex items-center justify-between gap-4">
 <div className="relative flex-1 max-w-md">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
  <Input
  placeholder="Search by category name..."
  className="pl-10 bg-white border-blue-500 focus-visible:bg-white focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 transition-all"
  onChange={(e) => onSearch(e.target.value)}
/>
</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'lg'}>Add Event</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <CreateEventForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EventHeader