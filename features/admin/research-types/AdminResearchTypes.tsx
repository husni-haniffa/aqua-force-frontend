"use client"
import { useState } from 'react'

import ResearchTypeHeader from './ResearchTypeHeader'
import ResearchTypeTable from './ResearchTypeTable'

const AdminResearchTypes = () => {
  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Research Types</h1>
        <p className='text-sm text-slate-600 mt-1'>
          Organize and manage research classification types
        </p>
      </div>
      <ResearchTypeHeader onSearch={setSearch}/>
      <ResearchTypeTable search={search}/>
    </div>
  )
}

export default AdminResearchTypes