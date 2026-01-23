"use client"
import { useState } from 'react'
import EventHeader from './EventHeader'
import EventTable from './EventTable'

const AdminEvents = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-9'>
      <EventHeader onSearch={setSearch}/>
      <EventTable search={search}/>
    </div>
  )
}

export default AdminEvents