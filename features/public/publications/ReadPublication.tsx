"use client"
import { usePublicationById } from './publication.hooks'
import Link from 'next/link'
import { Download} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formateDate } from '@/lib/format'
import { AlertError } from '@/components/ui/alert-error'
import { ReadPublicationSkeleton } from './Skeleton'
import { motion } from 'framer-motion'
import SocialLinks from './SocialLinks'
import { Label } from '@/components/ui/label'

const ReadPublication =  ({id} : {id: string}) => {

    const { data, isLoading, error } = usePublicationById(id)
    if(isLoading) return <ReadPublicationSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>

  return (
    <div className='pt-6 xl:pt-12 pb-16 xl:pb-24'>
        <div className='container'>
            <motion.article 
                initial={{opacity:0, x: -40}}
                animate={{opacity:1, x:0}}
                transition={{duration: 0.8, ease: "easeInOut"}}
            >  

                <div>
                    <div className='flex items-center justify-between mb-6'>
                        <div className='bg-green-100 px-2 py-1 rounded-md'>
                            <Label className='text-xs xl:text-sm text-green-500'>
                                {data?.categoryId.name}
                            </Label>
                        </div>
                        <div>
                            <Label className='text-xs xl:text-sm'>                            
                                Published on {data?.updatedAt ? formateDate(data.updatedAt) : 'N/A'}
                            </Label>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 mb-6'>
                        <div>
                            <h1 className='text-lg xl:text-xl font-bold'>
                                {data?.title}
                            </h1>
                        </div>
                        <div className='flex items-center gap-9'>
                            <div className='flex items-center gap-3'>
                                <span className='bg-blue-100 rounded-full px-2 py-1'>
                                    <Label className='text-xs xl:text-sm font-semibold text-blue-600'>{data?.userName.charAt(0)}</Label>
                                </span>
                                <Label className='text-slate-800'>{data?.userName}</Label>
                            </div>
                        </div>
                        <div>
                            <Label className='text-slate-800 font-semibold text-xs xl:text-sm'>{data?.researchTypeId.name}</Label>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h1 className='font-bold text-slate-800 text-lg xl:text-xl'>Abstract</h1>
                            <p className='text-slate-600 text-xs xl:text-sm leading-relaxed'>
                                {data?.abstract}            
                            </p>
                        </div>
                    </div>

                    <div className='border-t pt-6 space-y-4'>
    
                        {/* Keywords */}
                        <div className='flex flex-wrap gap-2'>
                            {data?.keywords.map((keyword, index) => (
                            <div className='bg-slate-200 w-fit px-2 py-1 rounded-md' key={index}>
                                <span className='text-slate-600 text-xs xl:text-sm'>{keyword}</span>
                            </div>
                            ))}
                        </div>

                        {/* Social Links + CTA */}
                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>                  
                            {data?.socialMediaLinks && (
                                <SocialLinks links={data?.socialMediaLinks} />
                            )}
                            <Button asChild className='w-full xl:w-auto'>                      
                                <Link href={data?.filePath || ''} target='_blank'>
                                    <Download/>
                                    Download
                                </Link>
                            </Button>                
                        </div>

                    </div>
                    
                </div>
            </motion.article>
        </div>
    </div>
  )
}

export default ReadPublication