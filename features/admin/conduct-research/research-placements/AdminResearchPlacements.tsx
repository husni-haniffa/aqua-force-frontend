"use client"
import { useState } from 'react'
import PlacementsHeader from './PlacementsHeader'
import PlacementsTable from './PlacementsTable'



const AdminResearchPlacements = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Research Placements</h1>
        <p className='text-sm text-slate-600 mt-1'>Manage applications from users submitted to Research Placements</p>
      </div>
      <PlacementsHeader onSearch={setSearch}/>
      <PlacementsTable search={search}/>
    </div>
  )
}

export default AdminResearchPlacements
