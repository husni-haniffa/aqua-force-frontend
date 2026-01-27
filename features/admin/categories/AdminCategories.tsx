"use client"
import { useState } from 'react'
import CategoryTable from './CategoryTable'
import CategoryHeader from './CategoryHeader'

const AdminCategories = () => {
  const [search, setSearch] = useState('')
  
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Categories</h1>
        <p className='text-sm text-slate-600 mt-1'>Manage and organize your content categories</p>
      </div>
      <CategoryHeader onSearch={setSearch}/>
      <CategoryTable search={search}/>
    </div>
  )
}

export default AdminCategories