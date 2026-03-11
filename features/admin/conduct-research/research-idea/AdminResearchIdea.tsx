"use client"
import { useState } from 'react'
import IdeaHeader from './IdeaHeader'
import IdeaTable from './IdeaTable'



const AdminResearchIdea = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Research Idea</h1>
        <p className='text-sm text-slate-600 mt-1'>Manage applications from users submitted to Research Idea</p>
      </div>
      <IdeaHeader onSearch={setSearch}/>
      <IdeaTable search={search}/>
    </div>
  )
}

export default AdminResearchIdea