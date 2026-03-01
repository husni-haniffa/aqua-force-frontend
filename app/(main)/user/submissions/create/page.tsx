"use client"
import CreateSubmissionForm from '@/features/user/submissions/CreateSubmissionForm'
import { useRouter } from 'next/navigation'

const CreateSubmissionPage = () => {
  const router = useRouter()
  return (
    <div className='container pt-6 xl:pt-12 pb-16 xl:pb-24 flex flex-col gap-6'>
      <CreateSubmissionForm onSuccess={() => router.push('/user/submissions')}/>
    </div>
  )
}

export default CreateSubmissionPage