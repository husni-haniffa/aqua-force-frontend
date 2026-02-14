"use client"
import { useState } from 'react'
import PublicationCard from './PublicationCard'
import PublicationHeader from './PublicationHeader'

const PublicPublications = () => {
    const [search, setSearch] = useState('')
  return (
    <section className='container pt-12 xl:pt-24 pb-16 xl:pb-24'>
        <PublicationHeader onSearch={setSearch}/>
        <PublicationCard search={search}/>
    </section>
  )
}

export default PublicPublications