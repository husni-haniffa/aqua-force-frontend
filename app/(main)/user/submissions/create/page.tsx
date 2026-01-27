"use client"
import { Button } from '@/components/ui/button'
import CreateSubmissionForm from '@/features/user/submissions/CreateSubmissionForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const CreateSubmissionPage = () => {
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
      <CreateSubmissionForm/>
    </div>
  )
}

export default CreateSubmissionPage