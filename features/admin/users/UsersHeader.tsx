import { useState } from 'react'
import { Input } from '@/components/ui/input'

const UsersHeader = ({ onSearch }: { onSearch: (value: string) => void }) => {

  const [open, setOpen] = useState(false)

  return (
    <div className="flex">
      <Input
        placeholder="Search for a user"
        className="w-96"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

export default UsersHeader