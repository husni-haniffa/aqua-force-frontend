import { CheckCircle, ClipboardList, FileSearch, LucideIcon, Users } from "lucide-react"

export interface AdminOverviewResponse {
    users: number
    waitlist: number
    underReview: number
    published: number
}

export interface StatCard {
    label: string
    description: string
    value: number
    icon: LucideIcon
    href: string
    cta: string
    gradient: string
}


export const Cards = (data: AdminOverviewResponse | undefined): StatCard[] => [
    {
        label: 'Joined Users',
        description: 'Users who have signed in to the platform',
        value: data?.users ?? 0,
        icon: Users,
        href: '/admin/users',
        cta: 'View Users',
        gradient: 'from-blue-500 to-cyan-400',
    },
    {
        label: 'Waitlist Applicants',
        description: 'Users who applied for membership',
        value: data?.waitlist ?? 0,
        icon: ClipboardList,
        href: '/admin/waitlist',
        cta: 'View Waitlist',
        gradient: 'from-indigo-500 to-blue-400',
    },
    {
        label: 'Submissions Under Review',
        description: 'Submissions pending your review',
        value: data?.underReview ?? 0,
        icon: FileSearch,
        href: '/admin/submissions',
        cta: 'Review Submissions',
        gradient: 'from-sky-500 to-blue-300',
    },
    {
        label: 'Published',
        description: 'Publications that are live',
        value: data?.published ?? 0,
        icon: CheckCircle,
        href: '/admin/publications',
        cta: 'View Publications',
        gradient: 'from-cyan-500 to-teal-400',
    },
]