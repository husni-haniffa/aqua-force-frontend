import { Home, LayoutDashboard, Layers, Newspaper, CalendarDays, FileText, Users, ClipboardList, BookOpenCheck, GraduationCap, HandCoins, LifeBuoy, Lightbulb, UserCog } from "lucide-react"

export const adminNavLinks = [
    {
        label: "DASHBOARD",
        items: [
            {
                title: "Overview",
                url: "/admin",
                icon: LayoutDashboard,
            },
            {
                title: "Home",
                url: "/",
                icon: Home,
            },
        ],
    },
    {
        label: "CONTENT",
        items: [
            {
                title: "Categories",
                url: "/admin/categories",
                icon: Layers,
            },
            {
                title: "Events",
                url: "/admin/events",
                icon: CalendarDays,
            },
            {
                title: "News",
                url: "/admin/news",
                icon: Newspaper,
            },
            {
                title: "Research Types",
                url: "/admin/research-types",
                icon: BookOpenCheck,
            },
           
        ],
    },
    {
        label: "RESEARCH",
        items: [
           
            {
                title: "Submissions",
                url: "/admin/submissions",
                icon: FileText,
            },
            {
                title: "Research Idea",
                url: "/admin/conduct-research/research-idea",
                icon: Lightbulb,
            },
            {
                title: "Research Placements",
                url: "/admin/conduct-research/research-placements",
                icon: GraduationCap,
            },
            {
                title: "Research Supervisors",
                url: "/admin/conduct-research/research-supervisor",
                icon: UserCog,
            },
            {
                title: "Research Students",
                url: "/admin/conduct-research/research-students",
                icon: Users,
            },
            {
                title: "Research Funding",
                url: "/admin/conduct-research/research-funding",
                icon: HandCoins,
            },
            {
                title: "Research Helps",
                url: "/admin/conduct-research/research-help",
                icon: LifeBuoy,
            },
            
        ],
    },

    {
        label: "USERS",
        items: [
            {
                title: "Users",
                url: "/admin/users",
                icon: Users,
            },
            {
                title: "Waitlist",
                url: "/admin/waitlist",
                icon: ClipboardList,
            },
        ],
    },

]