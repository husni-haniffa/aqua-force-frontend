import { ResearchFunding } from '@/features/public/conduct-research/research-funding/types'
import Link from 'next/link'

const FundingView = ({ data }: {data: ResearchFunding}) => {
  return (
    <div key={data._id}>
            <div>
                <h6 className='font-bold text-slate-800 text-base'>Contact Info</h6>
                <div className='mt-1 mb-2'>
                    <div className='flex gap-6'>
                        <p className='text-slate-800 text-sm'>Phone Number</p>
                        <p className='text-slate-800 text-sm'>{data.mobile}</p>
                    </div>

                    <div className='flex gap-6'>
                        <p className='text-slate-800 text-sm'>Whatsapp Number</p>
                        <p className='text-slate-800 text-sm'>{data.whatsapp}</p>
                    </div>
                </div>
            </div>
           
            <div>
                <h6 className='font-bold text-slate-800 text-base'>Social Media</h6>
                <div className='mt-1 mb-3 flex flex-wrap gap-6 text-sm'>
                    <Link href={`mailto:${data.email}`} className='bg-blue-50 px-1.5 py-1 rounded text-blue-500 hover:text-blue-600'> Email</Link>
                    <Link href={data.linkedin} className='bg-blue-50 px-1.5 py-1 rounded text-blue-500 hover:text-blue-600'>LinkedIn</Link>
                    <Link href={data.researchgate} className='bg-blue-50 px-1.5 py-1 rounded text-blue-500 hover:text-blue-600'>Research Gate</Link>
                    <Link href={data.orcid} className='bg-blue-50 px-1.5 py-1 rounded text-blue-500 hover:text-blue-600'>ORCID</Link>
                    <Link href={data.scholar} className='bg-blue-50 px-1.5 py-1 rounded text-blue-500 hover:text-blue-600'>Scholar</Link>
                </div>
            </div>

            <div>
                <div className='mt-1 mb-2'>
                    <h6 className='font-bold text-slate-800 text-base'>Minor Research Area</h6>
                    <p className='text-sm leading-relaxed'>{data.minorResearchAreaForFunding}</p>
                </div>
            </div>

            <div className='mt-1'>
                <h6 className='font-bold text-slate-800 text-base'>Contribution</h6>
                <p className='text-sm'>{data.howCanYouContribute}</p>
            </div>
        
    </div>
  )
}

export default FundingView