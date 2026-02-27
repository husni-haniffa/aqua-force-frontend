"use client"
import { useState } from 'react'
import PublicationCard from './PublicationCard'
import PublicationHeader from './PublicationHeader'

const PublicPublications = () => {
    const [search, setSearch] = useState('')
  return (
    <section className='container pt-6 xl:pt-12 pb-16 xl:pb-24'>
        <PublicationHeader onSearch={setSearch}/>
        <PublicationCard search={search}/>
    </section>
  )
}

export default PublicPublications