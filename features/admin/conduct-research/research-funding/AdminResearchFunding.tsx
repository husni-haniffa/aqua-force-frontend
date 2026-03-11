"use client"
import { useState } from 'react'

import FundingTable from './FundingTable'
import FundingHeader from './FundingHeader'



const AdminResearchFunding = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Research Funding</h1>
        <p className='text-sm text-slate-600 mt-1'>Manage applications from users submitted to Research Funding</p>
      </div>
      <FundingHeader onSearch={setSearch}/>
      <FundingTable search={search}/>
    </div>
  )
}

export default AdminResearchFunding
