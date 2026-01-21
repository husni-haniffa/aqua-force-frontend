"use client"
import { useState } from 'react'
import SubmissionHeader from './SubmissionHeader'
import SubmissiosCard from './SubmissionCard'

const UserSubmissions = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-9'>
      <SubmissionHeader onSearch={setSearch}/>
      <SubmissiosCard search={search}/>
    </div>
  )
}

export default UserSubmissions