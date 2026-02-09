import { Button } from '@/components/ui/button'
import { useFetchAdminOverview } from './overview.hooks'
import { AlertError } from '@/components/ui/alert-error'
import Link from 'next/link'

const AdminOverview = () => {

    const { data, isLoading, error } = useFetchAdminOverview()
    if(isLoading) return <p>ice</p>
    if (error instanceof Error) return <AlertError message={error.message}/>

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
        <header className="mb-4">
            <h1 className="text-lg font-semibold text-slate-800 mb-1">Joined Users</h1>
            <p className="text-sm text-slate-500">Users who have signed in to the platform</p>
        </header>
        <div className="mb-4">
            <span className="inline-block text-3xl font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-lg">
                {data?.users || 0}
            </span>
        </div>
        <Button asChild variant="outline" className="w-full">
            <Link href="/admin/users">View Users</Link>
        </Button>
    </div>
    
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
        <header className="mb-4">
            <h1 className="text-lg font-semibold text-slate-800 mb-1">Waitlist Applicants</h1>
            <p className="text-sm text-slate-500">Users who applied for membership</p>
        </header>
        <div className="mb-4">
            <span className="inline-block text-3xl font-bold text-amber-700 bg-amber-50 px-4 py-2 rounded-lg">
                {data?.waitlist || 0}
            </span>
        </div>
        <Button asChild variant="outline" className="w-full">
            <Link href="/admin/waitlist">View Waitlist</Link>
        </Button>
    </div>
    
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
        <header className="mb-4">
            <h1 className="text-lg font-semibold text-slate-800 mb-1">Submissions Under Review</h1>
            <p className="text-sm text-slate-500">Submissions pending your review</p>
        </header>
        <div className="mb-4">
            <span className="inline-block text-3xl font-bold text-red-700 bg-red-50 px-4 py-2 rounded-lg">
                {data?.underReview || 0}
            </span>
        </div>
        <Button asChild variant="outline" className="w-full">
            <Link href="/admin/submissions">Review Submissions</Link>
        </Button>
    </div>
    
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
        <header className="mb-4">
            <h1 className="text-lg font-semibold text-slate-800 mb-1">Published</h1>
            <p className="text-sm text-slate-500">Publications that are live</p>
        </header>
        <div className="mb-4">
            <span className="inline-block text-3xl font-bold text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                {data?.published || 0}
            </span>
        </div>
        <Button asChild variant="outline" className="w-full">
            <Link href="/admin/publications">View Publications</Link>
        </Button>
    </div>
</div>
  )
}

export default AdminOverview