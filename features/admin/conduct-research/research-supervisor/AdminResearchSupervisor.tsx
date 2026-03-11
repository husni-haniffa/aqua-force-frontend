"use client"
import { useState } from 'react'
import SupervisorHeader from './SupervisorHeader'
import SupervisorTable from './SupervisorTable'



const AdminResearchSupervisor = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Research Supervisor</h1>
        <p className='text-sm text-slate-600 mt-1'>Manage applications from users submitted to Research Supervisor</p>
      </div>
      <SupervisorHeader onSearch={setSearch}/>
      <SupervisorTable search={search}/>
    </div>
  )
}

export default AdminResearchSupervisor
