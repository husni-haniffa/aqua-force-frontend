import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PublicationCardProps } from './publication.types'
import { formateDate } from '@/lib/format'
import SocialLinks from './SocialLinks'
import { motion } from "framer-motion"


const Card = ({ publication, variants }: PublicationCardProps) => {
  return (
    <motion.div 
      key={publication._id} 
      className='bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group'>
            <div className='px-4 py-4'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='bg-green-100 px-2 py-1 rounded-md'>
                        <Label className='text-xs xl:text-sm text-green-500'>
                            {publication.categoryId.name}
                        </Label>
                    </div>
                    <div>
                        <Label className='text-xs xl:text-sm'>{formateDate(publication.updatedAt)}</Label>
                    </div>
                </div>
                <div className='flex flex-col gap-6 mb-6'>
                    <div>
                        <h1 className='text-lg xl:text-xl font-bold'>
                            {publication.title}
                        </h1>
                    </div>
                    <div className='flex items-center gap-9'>
                        <div className='flex items-center gap-3'>
                            <span className='bg-blue-100 rounded-full px-2 py-1'>
                                <Label className='text-xs xl:text-sm font-semibold text-blue-600'>{publication.userName.charAt(0)}</Label>
                            </span>
                            <Label className='text-slate-800'>{publication.userName}</Label>
                        </div>
                    </div>
                    <div>
                        <Label className='text-slate-800 font-semibold text-xs xl:text-sm'>{publication.researchTypeId.name}</Label>
                    </div>
                    <div>
                        <p className='text-slate-600 text-xs xl:text-sm leading-relaxed'>
                            {publication.abstract.slice(0,500)}...              
                        </p>
                    </div>
                </div>

                <div className='border-t pt-6 space-y-4'> 
                  {/* Keywords */}
                  <div className='flex flex-wrap gap-2'>
                    {publication.keywords.map((keyword, index) => (
                      <div className='bg-slate-200 w-fit px-1 py-0.5 xl:px-2 xl:py-1 rounded-md' key={index}>
                        <span className='text-slate-600 text-xs xl:text-sm'>{keyword}</span>
                      </div>
                    ))}
                  </div>

                  {/* Social Links + CTA */}
                  <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>             
                    {publication.socialMediaLinks && (
                      <SocialLinks links={publication.socialMediaLinks} />
                    )}
                    <Button 
                      asChild 
                      variant="outline" 
                      className="border-none w-full sm:w-auto">
                      <Link 
                        href={`/publications/${publication._id}/read`} 
                        className="text-blue-500 flex items-center justify-center sm:justify-start gap-2 w-full"
                      >
                        <span>Read Full Publication</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
            </div>  
    </motion.div>
  )
}

export default Card