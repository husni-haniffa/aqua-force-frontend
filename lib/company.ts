import { CheckCircle, Lock, Users, FlaskConical } from "lucide-react"

export const contactInfo = [
    {
        id: 1,
        label: "077 1234 567",
        href: ""
    },
    {
        id: 2,
        label: "researchmindsnet@gmail.com",
        href: ""
    },
    {
        id: 3,
        label: "Colombo, Sri Lanka",
        href: ""
    },
]



export const researchFeatures = [
    {
        id: "priority-review",
        title: "Priority Review",
        description:
            "Fast-track review of research submissions, proposals, and publications for quicker processing and guidance.",
        icon: CheckCircle,
        color: {
            icon: "text-blue-600",
            bg: "bg-blue-50",
            glow: "bg-blue-100"
        }
    },
    {
        id: "secure-access",
        title: "Secure Access",
        description:
            "Private workspaces, protected data storage, and secure collaboration for research projects.",
        icon: Lock,
        color: {
            icon: "text-cyan-600",
            bg: "bg-cyan-50",
            glow: "bg-cyan-100"
        }
    },
    {
        id: "supervisor-support",
        title: "Supervisor & Research Support",
        description:
            "Assistance in finding supervisors, research placements, study sites, and suitable research collaborations.",
        icon: Users,
        color: {
            icon: "text-indigo-600",
            bg: "bg-indigo-50",
            glow: "bg-indigo-100"
        }
    },
    {
        id: "research-services",
        title: "Research Services & Facilities",
        description:
            "Support for sampling, sample analysis, data analysis, interpretation, and access to research facilities.",
        icon: FlaskConical,
        color: {
            icon: "text-sky-600",
            bg: "bg-sky-50",
            glow: "bg-sky-100"
        }
    }
]
