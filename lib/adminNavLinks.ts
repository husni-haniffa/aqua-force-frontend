import { Home, Layers, Newspaper, Calendar, Inbox } from "lucide-react"

export const adminNavLinks = [
    {
        label: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/admin",
                icon: Home,
            },
        ],
    },
    {
        label: "Content",
        items: [
            {
                title: "Categories",
                url: "/admin/categories",
                icon: Layers,
            },
            {
                title: "News",
                url: "/admin/news",
                icon: Newspaper,
            },
            {
                title: "Events",
                url: "/admin/events",
                icon: Calendar,
            },
        ],
    },
    {
        label: "Research",
        items: [
            {
                title: "Submissions",
                url: "/admin/submissions",
                icon: Inbox,
            },
        ],
    },

]