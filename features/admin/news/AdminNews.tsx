"use client"
import { useState } from 'react'
import NewsHeader from './NewsHeader'
import NewsTable from './NewsTable'


const AdminNews = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-9'>
      <NewsHeader onSearch={setSearch}/>
      <NewsTable search={search}/>
    </div>
  )
}

export default AdminNews