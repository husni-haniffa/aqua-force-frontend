"use client"
import { useState } from 'react'
import SubmissionHeader from './SubmissionHeader'
import SubmissionsTable from './SubmissionsTable'

const UserSubmissions = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='container pt-6 xl:pt-12 pb-16 xl:24 flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>
          My Submissions
        </h1>
        <p className='text-sm text-slate-600 mt-1'>
          Track the status of your submitted research papers
        </p>
      </div>
      <SubmissionHeader onSearch={setSearch}/>
      <SubmissionsTable search={search}/>
    </div>
  )
}

export default UserSubmissions