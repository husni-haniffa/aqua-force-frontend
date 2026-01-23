import { useState } from 'react'
import { Input } from '@/components/ui/input'

const SubmissionsHeader = ({ onSearch }: { onSearch: (value: string) => void }) => {

  const [open, setOpen] = useState(false)

  return (
    <div className="flex">
      <Input
        placeholder="Search for a title"
        className="w-96"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

export default SubmissionsHeader