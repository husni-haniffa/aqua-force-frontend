"use client"
import { Label } from '@/components/ui/label'
import { usePublicationById } from './publication.hooks'
import Link from 'next/link'
import { FileText, User, Tag, ArrowLeft, Calendar, ExternalLink, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ReadPublication =  ({id} : {id: string}) => {

    const { data, isLoading, error } = usePublicationById(id)
    if(isLoading) return (
        <div className="container py-12">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading publication...</p>
            </div>
        </div>
    )
    if(error instanceof Error) return (
        <div className="container py-12">
            <div className="text-center text-red-500">
                <p>Error loading publication: {error.message}</p>
            </div>
        </div>
    )
  return (
    <div >
        <div>

            {/* Publication Content */}
            <article >
                {/* Header with gradient */}
      
                
                <div >
                    {/* Publication Header */}
                    <header className="mb-8">
                        {/* Category Badge */}
                         <div className="mb-4">
                            <span className='text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md'>
                                {data?.categoryId.name}
                            </span>                       
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-slate-800 text-xl md:text-2xl font-bold mb-6 leading-tight">
                            {data?.title}
                        </h1>
                        
                        {/* Publication Meta */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-600 mb-6">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {data?.userName}
                                </span>
                            </div>
                            
                        
                        </div>
                        
                        {/* Keywords */}
                        <div className="flex flex-wrap gap-2">
                            {data?.keywords.map((keyword, index) => (
                                <span 
                                    key={index} 
                                    className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-md"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </header>
                   
                    {/* Abstract Section */}
                    <section className="mb-6">
                        <h2 className="text-slate-800 text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                            Abstract
                        </h2>
                        <div>
                            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                                {data?.abstract}
                            </p>
                        </div>
                    </section>
                    
                    {/* Publication Footer */}
                    <div className="pt-6 border-t border-slate-200">
                       
                            
                            <div className="flex justify-center md:justify-end gap-4">
                                <div className="text-slate-500 text-xs xl:text-sm">
                                Published on {data?.updatedAt && new Date(data.updatedAt).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                                <Link href={data?.fileUrl || ""}>
                                     <Button>
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </Button>
                                </Link>                         
                               
                            </div>
                        </div>
               
                </div>
            </article>
        </div>
    </div>
  )
}

export default ReadPublication