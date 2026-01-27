"use client"
import { useState } from 'react'
import UsersHeader from './UsersHeader'
import UserTable from './UserTable'

const AdminUsers = () => {

  const [search, setSearch] = useState('')

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-bold text-3xl text-slate-800'>Users</h1>
        <p className='text-sm text-slate-600 mt-1'>View and manage registered users and roles</p>
      </div>
      <UsersHeader onSearch={setSearch}/>
      <UserTable search={search}/>
    </div>
  )
}

export default AdminUsers