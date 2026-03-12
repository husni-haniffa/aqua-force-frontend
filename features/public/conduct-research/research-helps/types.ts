import { z } from "zod";

const phoneRegex = /^07\d{8}$/;

export const formSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(20, "Title too long"),

    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(200, "Name cannot exceed 200 characters"),

    mobile: z
        .string()
        .regex(phoneRegex, "Mobile must be 10 digits starting with 07"),

    whatsapp: z
        .string()
        .regex(phoneRegex, "WhatsApp must be 10 digits starting with 07"),

    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .max(255, "Email too long"),

    linkedin: z
        .string()
        .trim()
        .url("Invalid LinkedIn URL"),


    orcid: z
        .string()
        .trim()
        .url("Invalid ORCID URL"),

    researchgate: z
        .string()
        .trim()
        .url("Invalid ResearchGate URL"),

    scholar: z
        .string()
        .trim()
        .url("Invalid Google Scholar URL"),

    designation: z
        .string()
        .trim()
        .min(2, "Designation required")
        .max(150, "Designation too long"),

    affiliation: z
        .string()
        .trim()
        .min(2, "Affiliation required")
        .max(200, "Affiliation too long"),


    degree: z
        .string()
        .min(1, "Degree is required"),

    categoryId: z
        .string()
        .min(1, "Category is required"),

    minorResearchArea: z
        .string()
        .trim()
        .min(10, "Minor research area must be at least 10 characters")
        .max(1000, "Too long"),

    howCanYouContribute: z
        .string()
        .trim()
        .min(10, "Please explain your contribution")
        .max(1000, "Too long"),
});

export const typeofContributions = [
    {
        id: 1,
        value: "Proposal Development"
    },
    {
        id: 2,
        value: "Methodology Development"
    },
    {
        id: 3,
        value: "Field Works"
    },
    {
        id: 4,
        value: "Lab works"
    },
    {
        id: 5,
        value: "Data Analysis"
    },
    {
        id: 6,
        value: "Data Interpretation"
    },
    {
        id: 7,
        value: "Writing"
    },
    {
        id: 8,
        value: "Publishing"
    },
    {
        id: 9,
        value: "I can contribute in another way"
    },
]

export interface ResearchHelps {
    _id: string
    title: string;
    name: string;
    mobile: string;
    whatsapp: string;
    email: string;
    linkedin: string;
    orcid: string;
    researchgate: string;
    scholar: string;
    designation: string;
    affiliation: string;
    degree: string;
    categoryId: {
        _id: string
        name: string
    }
    minorResearchArea: string;
    howCanYouContribute: string;
    createdAt: string
    updatedAt: string
}

export interface ResearchHelpsFormProps {
    onSuccess?: () => void
}