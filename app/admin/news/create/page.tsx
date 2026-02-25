"use client"
import { Button } from '@/components/ui/button'
import CreateNewsForm from '@/features/admin/news/CreateNewsForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from "next/navigation"

const CreateNewsPage = () => {
  const router = useRouter()
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <Link href={'/admin/news'}>
          <Button variant={'secondary'}>
            <ArrowLeft/>
            Go Back
          </Button>
        </Link>
      </div>
      <CreateNewsForm onSuccess={() => router.push('/admin/news')}/>
    </div>
  )
}

export default CreateNewsPage