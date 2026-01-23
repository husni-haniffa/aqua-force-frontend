"use client"
import { useState } from 'react'
import SubmissionHeader from './SubmissionHeader'

import SubmissionsTable from './SubmissionsTable'

const UserSubmissions = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-9'>
      <SubmissionHeader onSearch={setSearch}/>
      <SubmissionsTable search={search}/>
    </div>
  )
}

export default UserSubmissions