"use client"
import { Button } from '@/components/ui/button'
import CreateSubmissionForm from '@/features/user/submissions/CreateSubmissionForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const CreateSubmissionPage = () => {
  const router = useRouter()
  return (
    <div className='container py-16 flex flex-col gap-6'>
      <div>
        <Link href={'/user/submissions'}>
          <Button variant={'secondary'}>
            <ArrowLeft/>
            Go Back
          </Button>
        </Link>
      </div>
      <CreateSubmissionForm onSuccess={() => router.push('/user/submissions')}/>
    </div>
  )
}

export default CreateSubmissionPage