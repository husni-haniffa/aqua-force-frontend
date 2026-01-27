"use client"
import { Button } from '@/components/ui/button'
import CreateNewsForm from '@/features/admin/news/CreateNewsForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const CreateNewsPage = () => {
  return (
    <div className='container py-24 flex flex-col gap-6'>
      <div>
        <Link href={'/admin/news'}>
          <Button variant={'secondary'}>
            <ArrowLeft/>
            Go Back
          </Button>
        </Link>
      </div>
      <CreateNewsForm/>
    </div>
  )
}

export default CreateNewsPage