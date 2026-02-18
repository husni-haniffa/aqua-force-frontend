export const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
}

export const item = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
}