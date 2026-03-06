import {
    Lightbulb,
    GraduationCap,
    UserCog,
    Users,
    HandCoins,
    LifeBuoy
} from "lucide-react";

export const conductResearchFeatures = [
    {
        id: "research-idea",
        icon: Lightbulb,
        label: "Research Idea",
        description:
            "Share innovative research ideas with the global research community and discover collaboration opportunities with experts and students.",
        href: "/conduct-research/research-idea",
    },
    {
        id: "research-placements",
        icon: GraduationCap,
        label: "Research Placements",
        description:
            "Explore research placement opportunities offered by universities, institutions, and research groups worldwide.",
        href: "/conduct-research/research-placements",
    },
    {
        id: "research-supervisor",
        icon: UserCog,
        label: "Research Supervisor",
        description:
            "Connect with experienced researchers and academics who are available to supervise and guide research projects.",
        href: "/conduct-research/research-supervisor",
    },
    {
        id: "research-students",
        icon: Users,
        label: "Research Students",
        description:
            "Find motivated students and collaborators who are interested in joining research projects and contributing their skills.",
        href: "/conduct-research/research-students",
    },
    {
        id: "research-funding",
        icon: HandCoins,
        label: "Funding",
        description:
            "Discover funding opportunities, grants, and sponsorship programs that support research and innovation initiatives.",
        href: "/conduct-research/research-funding",
    },
    {
        id: "research-helps",
        icon: LifeBuoy,
        label: "Research Helps",
        description:
            "Access resources, tools, and guidance that support researchers throughout the research lifecycle.",
        href: "/conduct-research/research-helps",
    }
];

export const iconStyles: Record<string, string> = {
    "research-idea": "bg-amber-50 group-hover:bg-amber-100 [&>svg]:text-amber-500",
    "research-placements": "bg-violet-50 group-hover:bg-violet-100 [&>svg]:text-violet-500",
    "research-supervisor": "bg-blue-50 group-hover:bg-blue-100 [&>svg]:text-blue-500",
    "research-students": "bg-emerald-50 group-hover:bg-emerald-100 [&>svg]:text-emerald-500",
    "research-funding": "bg-rose-50 group-hover:bg-rose-100 [&>svg]:text-rose-500",
    "research-helps": "bg-cyan-50 group-hover:bg-cyan-100 [&>svg]:text-cyan-500",
}