import { Home, LayoutDashboard, Layers, Newspaper, CalendarDays, FileText, Users } from "lucide-react"

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
        ],
    },

]