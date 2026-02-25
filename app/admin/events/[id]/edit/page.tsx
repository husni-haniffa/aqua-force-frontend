"use client"
import { Button } from "@/components/ui/button"
import EditEventForm from "@/features/admin/events/EditEventForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"

interface PageProps {
  params: Promise<{ id: string }>
}

const EditEventPage = ({ params }: PageProps) => {

  const { id } = use(params)
  const router = useRouter()
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={'/admin/events'}>
          <Button variant={'secondary'}>
            <ArrowLeft/>
            Go Back
          </Button>
        </Link>
      </div>
      <EditEventForm eventId={id} onSuccess={() => router.push('/admin/events')}/>
    </div>
  )
}

export default EditEventPage
