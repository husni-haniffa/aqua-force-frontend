import { motion } from "framer-motion"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NewsResponse } from '@/features/admin/news/news.types'
import { formateDate } from '@/lib/format'
import { Variant } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface NewsCardProps {
    news: NewsResponse
    variants?: Variant
}

const Card = ({news, variants} : NewsCardProps) => {

  return (

    <motion.div
        key={news._id}
        className='bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group'
    >

    
        {news.imageUrl && (
            <div className="relative w-full h-50">
                <Image
                    src={news.imageUrl}
                    alt="news-post"
                    fill
                    priority
                    className="object-cover"
                />
            </div>
        )}  
        
        <div className='px-4 py-2'>
            <div className='flex flex-col gap-4 mb-6 mt-3'>
                <h1 className='text-lg xl:text-xl font-bold text-slate-800'>{news.title}</h1>
                <p className='text-xs xl:text-sm text-slate-600 leading-relaxed'>{news.content.slice(0,500)}...</p>
            </div>

            <div className='border-t'>
                <div className='flex items-center justify-between mt-6'>
                    <Label className='text-xs xl:text-sm text-slate-800'>{formateDate(news.updatedAt)}</Label>
                    <Button asChild variant={'outline'} className='border-none'>
                        <Link href={`/news/${news._id}/read`} className='text-blue-500'>
                            Read Full News
                            <ArrowRight />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
        
    </motion.div>
  )
}

export default Card