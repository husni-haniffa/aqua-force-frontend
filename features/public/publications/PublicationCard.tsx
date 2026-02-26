"use client"
import { usePublications } from './publication.hooks'
import Link from 'next/link'
import { User, Tag, ArrowRight, Search, Youtube, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { formateDate } from '@/lib/format'
import { PublicationCardSkeleton } from './Skeleton'
import { AlertError } from '@/components/ui/alert-error'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { container, item } from '@/lib/animation'
import { useResearchTypes } from '@/features/admin/research-types/research-type.hooks'
import Card from './Card'

const PublicationCard = ({ search }: { search: string }) => {

    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [selectedType, setSelectedType] = useState<string | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
        setDebouncedSearch(search)
        }, 300) 
        return () => clearTimeout(timer)
    }, [search])

        const isSearchingPublication = search !== debouncedSearch;

    const { data, isLoading, error } = usePublications()
     const { data: researchTypes, isLoading: researchTypesLoading, error: researchTypesError } = useResearchTypes()
       const filtered = data?.filter((publication) => {
    const matchesSearch = publication.title.toLowerCase().includes(search.toLowerCase()) || 
        publication.categoryId.name.toLowerCase().includes(search.toLowerCase())
    
    const matchesType = !selectedType || publication.researchTypeId._id === selectedType
    
    return matchesSearch && matchesType
})
    if(isLoading || isSearchingPublication ) return <PublicationCardSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>
        if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No publications, create one</p>

 


  return (
  

        
    <div>

       <div className='flex items-center gap-2 flex-wrap mb-6'>
    <button
        onClick={() => setSelectedType(null)}
        className={`px-4 py-1.5 rounded-full text-xs lg:text-sm  transition-all duration-200
            ${!selectedType 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
    >
        All
    </button>
    {researchTypes?.map((researchType) => (
        <button
            key={researchType._id}
            onClick={() => setSelectedType(researchType._id)}
            className={`px-4 py-1.5 rounded-full text-xs lg:text-sm transition-all duration-200
                ${selectedType === researchType._id 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
        >
            {researchType.name}
        </button>
    ))}
</div>  

        {filtered?.length === 0 ? (
            <div className='flex items-center justify-center font-semibold text-lg'>
                No publications, create one
            </div>
        ) : (
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-9">

            

            {filtered?.map((publication) => (

                <Card publication={publication} key={publication._id}/>
            ))}

        </div>
        )}
       
    </div>
 
        
        
        
   
   
  )
}

export default PublicationCard