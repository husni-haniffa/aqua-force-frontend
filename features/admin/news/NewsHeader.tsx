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
import CreateNewsForm from './CreateNewsForm'


const NewsHeader = ({ onSearch }: { onSearch: (value: string) => void }) => {

  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center justify-between gap-3">
      <Input
        placeholder="Search for a news"
        className="w-96"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add News</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle>Add News</DialogTitle>
          </DialogHeader>
          <CreateNewsForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewsHeader