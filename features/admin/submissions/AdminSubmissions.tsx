"use client"


import SubmissionHeader from './SubmissionHeader'
import SubmissionTable from './SubmissionTable'
import { useState } from 'react'

const AdminSubmissions = () => {
  const [search, setSearch] = useState('')
  return (
      <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Submissions</h1>
        <p className='text-sm text-slate-600 mt-1'>Manage and organize your content categories</p>
      </div>
        <SubmissionHeader onSearch={setSearch}/>
        <SubmissionTable search={search}/>
    </div>
  )
}

export default AdminSubmissions