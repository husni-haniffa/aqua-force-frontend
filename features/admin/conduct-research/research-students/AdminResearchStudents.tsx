"use client"
import { useState } from 'react'
import StudentsHeader from './StudentsHeader'
import StudentsTable from './StudentsTable'



const AdminResearchStudents = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Research Students</h1>
        <p className='text-sm text-slate-600 mt-1'>Manage applications from users submitted to Research Students</p>
      </div>
      <StudentsHeader onSearch={setSearch}/>
      <StudentsTable search={search}/>
    </div>
  )
}

export default AdminResearchStudents
