"use client"
import { useState } from 'react'
import EventHeader from './EventHeader'
import EventTable from './EventTable'

const AdminEvents = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Events</h1>
        <p className='text-sm text-slate-600 mt-1'>Manage upcoming conferences, workshops, and academic events</p>
      </div>
      <EventHeader onSearch={setSearch}/>
      <EventTable search={search}/>
    </div>
  )
}

export default AdminEvents