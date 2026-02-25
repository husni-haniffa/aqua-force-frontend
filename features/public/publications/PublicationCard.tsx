"use client"
import { usePublications } from './publication.hooks'
import Link from 'next/link'
import { User, ArrowRight, Youtube, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { formateDate } from '@/lib/format'
import { PublicationCardSkeleton } from './Skeleton'
import { AlertError } from '@/components/ui/alert-error'
import { useEffect, useState } from 'react'
import { useResearchTypes } from '@/features/admin/research-types/research-type.hooks'

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

                <div key={publication._id} 
            
                className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">

                    <div className="px-4 py-4">
                        
                        <div className="mb-4">
                            <span className='text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md'>
                                {publication.categoryId.name}
                            </span>                       
                        </div>
                        
                   
                        <header className="mb-4">
                            <h3 className="text-lg xl:text-xl font-bold text-slate-950 hover:text-slate-800 transition-colors">
                                {publication.title}
                            </h3>
                        </header>
                        
                 
                        <div className="flex items-center gap-1 mb-4">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-slate-900" />
                            <span className="text-slate-900 text-xs xl:text-sm">
                                {publication.userName} <span className='ml-6 font-bold text-amber-600'>{publication.researchTypeId.name}</span>
                            </span>
                        </div>
                        
                   
                        <div className="flex-1 mb-4">
                            <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                                {publication.abstract}
                            </p>
                        </div>
                        
                    
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-2">
                                {publication.keywords.map((keyword, index) => (
                                    <span 
                                        key={index} 
                                        className="px-1.5 sm:px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                    
                        <div className="mb-8">
                            {publication.socialMediaLinks && (
                                <div className="flex items-center gap-3">
                                    {publication.socialMediaLinks.youtube && (
                                        <Link 
                                            href={publication.socialMediaLinks.youtube} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                                            title="YouTube"
                                        >
                                            <Youtube className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {publication.socialMediaLinks.facebook && (
                                        <Link 
                                            href={publication.socialMediaLinks.facebook} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                                            title="Facebook"
                                        >
                                            <Facebook className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {publication.socialMediaLinks.instagram && (
                                        <Link 
                                            href={publication.socialMediaLinks.instagram} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-pink-600 hover:text-pink-700 transition-colors"
                                            title="Instagram"
                                        >
                                            <Instagram className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {publication.socialMediaLinks.twitter && (
                                        <Link 
                                            href={publication.socialMediaLinks.twitter} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-sky-600 hover:text-sky-700 transition-colors"
                                            title="Twitter"
                                        >
                                            <Twitter className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {publication.socialMediaLinks.linkedin && (
                                        <Link 
                                            href={publication.socialMediaLinks.linkedin} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-700 hover:text-blue-800 transition-colors"
                                            title="LinkedIn"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <h6 className='text-xs xl:text-sm text-slate-600'>
                                {formateDate(publication.updatedAt)}
                            </h6>
                            <Link 
                                href={`/publications/${publication._id}/read`}
                                className='text-xs xl:text-sm flex items-center text-blue-500 gap-2'
                            >
                                Read full publication
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                        </div>
                        
                    </div>

                </div>
            ))}

        </div>
        )}
       
    </div>
 
        
        
        
   
   
  )
}

export default PublicationCard