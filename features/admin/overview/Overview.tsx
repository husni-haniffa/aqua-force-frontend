import { AlertError } from "@/components/ui/alert-error"
import Card from "./Card"
import { useFetchAdminOverview } from "./overview.hooks"
import { Cards } from "./overview.types"
import { AdminOverviewSkeleton } from "./Skeleton"

const AdminOverview = () => {
  const { data, isLoading, error } = useFetchAdminOverview()

  if (isLoading) return <AdminOverviewSkeleton />
  if (error instanceof Error) return <AlertError message={error.message} />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Cards(data).map((card) => (
        <Card key={card.href} {...card} />
      ))}
    </div>
  )
}

export default AdminOverview