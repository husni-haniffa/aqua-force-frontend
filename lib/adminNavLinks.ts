import { Home, Layers, Newspaper, Calendar, Inbox } from "lucide-react"

export const adminNavLinks = [
    {
        label: "DASHBOARD",
        items: [
            {
                title: "Overview",
                url: "/admin",
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
        label: "RESEARCH",
        items: [
            {
                title: "Submissions",
                url: "/admin/submissions",
                icon: Inbox,
            },
        ],
    },

    {
        label: "USERS",
        items: [
            {
                title: "Users",
                url: "/admin/users",
                icon: Inbox,
            },
        ],
    },

]