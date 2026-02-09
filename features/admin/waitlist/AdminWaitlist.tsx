"use client"
import { useState } from 'react'
import WaitlistHeader from './WaitlistHeader'
import WaitlistTable from './WaitlistTable'


const AdminWaitlist = () => {
  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Waitlist</h1>
        <p className='text-sm text-slate-600 mt-1'>
          Manage and review users who have applied for membership access
        </p>
      </div>
      <WaitlistHeader onSearch={setSearch}/>
      <WaitlistTable search={search}/>
    </div>
  )
}

export default AdminWaitlist