"use client"
import SubmissionHeader from '@/features/user/submissions/SubmissionHeader'
import SubmissionTable from './SubmissionTable'
import { useState } from 'react'

const AdminSubmissions = () => {
  const [search, setSearch] = useState('')
  return (
    <div className='flex flex-col gap-9'>
        <SubmissionHeader onSearch={setSearch}/>
        <SubmissionTable search={search}/>
    </div>
  )
}

export default AdminSubmissions