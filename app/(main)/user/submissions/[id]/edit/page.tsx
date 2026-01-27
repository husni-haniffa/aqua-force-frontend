"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import EditSubmissionForm from "@/features/user/submissions/EditSubmissionForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { use } from "react"

interface PageProps {
  params: Promise<{ id: string }>
}

const EditSubmissionPage = ({ params }: PageProps) => {

  const {id} = use(params)

  return (
    <div className="container py-24 flex flex-col gap-6">
      <div>
        <Link href={'/user/submissions'}>
          <Button variant={'secondary'}>
            <ArrowLeft/>
            Go Back
          </Button>
        </Link>
      </div>
      <div>
        <Badge className="bg-yellow-50 text-yellow-800 text-sm rounded-md">
          Submitting this form will replace all existing details of your submission.
          Any uploaded files will be overwritten. Please review carefully before submitting.
        </Badge>
      </div>
      <EditSubmissionForm submissionId={id} />
    </div>
  )
}

export default EditSubmissionPage