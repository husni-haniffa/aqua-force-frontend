"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const NotFound = () => {
    const router = useRouter()
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <div className='container flex flex-col gap-9'>
            <header className='text-center font-bold text-6xl'>404</header>
            <header className='text-center font-semibold text-3xl'>Page Not Found</header>
            <p className='text-center'>Sorry, the page you are looking for could not be found</p>
            <Button onClick={() => router.push('/')}>
                <ArrowLeft/>
                Return Home
            </Button>
        </div>
    </div>
  )
}

export default NotFound