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
import CreateCategoryForm from './CreateCategoryForm'

const CategoryHeader = ({ onSearch }: { onSearch: (value: string) => void }) => {

  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center justify-between gap-3">
      <Input
        placeholder="Search for a category"
        className="w-96"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <CreateCategoryForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CategoryHeader