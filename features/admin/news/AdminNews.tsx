"use client"
import { useState } from 'react'
import NewsHeader from './NewsHeader'
import NewsTable from './NewsTable'


const AdminNews = () => {

  const [search, setSearch] = useState('')
  
  return (
     <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>News</h1>
        <p className='text-sm text-slate-600 mt-1'>Manage and organize your content categories</p>
      </div>
      <NewsHeader onSearch={setSearch}/>
      <NewsTable search={search}/>
    </div>
  )
}

export default AdminNews