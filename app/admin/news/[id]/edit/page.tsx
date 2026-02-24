"use client"
import { Button } from "@/components/ui/button"
import EditNewsForm from "@/features/admin/news/EditNewsForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"

interface PageProps {
  params: Promise<{ id: string }>
}

const EditNewsPage = ({ params }: PageProps) => {

  const { id } = use(params)
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={'/admin/news'}>
          <Button variant={'secondary'}>
            <ArrowLeft/>
            Go Back
          </Button>
        </Link>
      </div>
      <EditNewsForm newsId={id} onSuccess={() => router.push('/admin/news')} />
    </div>
  )
}

export default EditNewsPage
