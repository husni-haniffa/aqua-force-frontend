import { Button } from '@/components/ui/button'
import { useFetchAdminOverview } from './overview.hooks'
import { AlertError } from '@/components/ui/alert-error'
import Link from 'next/link'
import { Users, ClipboardList, FileSearch, CheckCircle } from 'lucide-react'

const AdminOverview = () => {

    const { data, isLoading, error } = useFetchAdminOverview()
    if(isLoading) return <p>Loading...</p>
    if (error instanceof Error) return <AlertError message={error.message}/>

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Joined Users Card */}
    <div className="relative overflow-hidden bg-linear-to-br from-blue-500 to-cyan-400 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative">
            <div className="inline-flex p-3 rounded-lg bg-white/20 backdrop-blur-sm mb-4">
                <Users className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <header className="mb-4">
                <h1 className="text-lg font-semibold text-white mb-1">Joined Users</h1>
                <p className="text-sm text-white/80">Users who have signed in to the platform</p>
            </header>
            <div className="mb-4">
                <span className="inline-block text-4xl font-bold text-white">
                    {data?.users || 0}
                </span>
            </div>
            <Button asChild variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm font-semibold">
                <Link href="/admin/users">View Users</Link>
            </Button>
        </div>
    </div>
    
    {/* Waitlist Applicants Card */}
    <div className="relative overflow-hidden bg-linear-to-br from-indigo-500 to-blue-400 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative">
            <div className="inline-flex p-3 rounded-lg bg-white/20 backdrop-blur-sm mb-4">
                <ClipboardList className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <header className="mb-4">
                <h1 className="text-lg font-semibold text-white mb-1">Waitlist Applicants</h1>
                <p className="text-sm text-white/80">Users who applied for membership</p>
            </header>
            <div className="mb-4">
                <span className="inline-block text-4xl font-bold text-white">
                    {data?.waitlist || 0}
                </span>
            </div>
            <Button asChild variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm font-semibold">
                <Link href="/admin/waitlist">View Waitlist</Link>
            </Button>
        </div>
    </div>
    
    {/* Submissions Under Review Card */}
    <div className="relative overflow-hidden bg-linear-to-br from-sky-500 to-blue-300 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative">
            <div className="inline-flex p-3 rounded-lg bg-white/20 backdrop-blur-sm mb-4">
                <FileSearch className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <header className="mb-4">
                <h1 className="text-lg font-semibold text-white mb-1">Submissions Under Review</h1>
                <p className="text-sm text-white/80">Submissions pending your review</p>
            </header>
            <div className="mb-4">
                <span className="inline-block text-4xl font-bold text-white">
                    {data?.underReview || 0}
                </span>
            </div>
            <Button asChild variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm font-semibold">
                <Link href="/admin/submissions">Review Submissions</Link>
            </Button>
        </div>
    </div>
    
    {/* Published Card */}
    <div className="relative overflow-hidden bg-linear-to-br from-cyan-500 to-teal-400 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative">
            <div className="inline-flex p-3 rounded-lg bg-white/20 backdrop-blur-sm mb-4">
                <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <header className="mb-4">
                <h1 className="text-lg font-semibold text-white mb-1">Published</h1>
                <p className="text-sm text-white/80">Publications that are live</p>
            </header>
            <div className="mb-4">
                <span className="inline-block text-4xl font-bold text-white">
                    {data?.published || 0}
                </span>
            </div>
            <Button asChild variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm font-semibold">
                <Link href="/admin/publications">View Publications</Link>
            </Button>
        </div>
    </div>
</div>
  )
}

export default AdminOverview