"use client"
import { useState } from 'react'
import CategoryTable from './CategoryTable'
import CategoryHeader from './CategoryHeader'

const AdminCategories = () => {

  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-9'>
      <CategoryHeader onSearch={setSearch}/>
      <CategoryTable search={search}/>
    </div>
  )
}

export default AdminCategories