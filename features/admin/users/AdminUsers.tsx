"use client"
import { useState } from 'react'
import UsersHeader from './UsersHeader'
import UserTable from './UserTable'

const AdminUsers = () => {
   const [search, setSearch] = useState('')
  return (
    <div>
      <UsersHeader onSearch={setSearch}/>
      <UserTable search={search}/>
    </div>
    
  )
}

export default AdminUsers