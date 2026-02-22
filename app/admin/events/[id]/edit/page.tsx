"use client"
import { Button } from "@/components/ui/button"
import EditEventForm from "@/features/admin/events/EditEventForm"
import EditNewsForm from "@/features/admin/news/EditNewsForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { use } from "react"

interface PageProps {
  params: Promise<{ id: string }>
}

const EditEventPage = ({ params }: PageProps) => {

  const { id } = use(params)

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
      <EditEventForm eventId={id} />
    </div>
  )
}

export default EditEventPage
