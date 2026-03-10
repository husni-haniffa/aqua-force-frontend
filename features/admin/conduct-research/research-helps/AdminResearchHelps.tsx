"use client"
import { useState } from 'react'
import HelpsHeader from './HelpsHeader'
import HelpsTable from './HelpsTable'



const AdminResearchHelps = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Research Helps</h1>
        <p className='text-sm text-slate-600 mt-1'>Manage applications from users submitted to Research Helps</p>
      </div>
      <HelpsHeader onSearch={setSearch}/>
      <HelpsTable search={search}/>
    </div>
  )
}

export default AdminResearchHelps
