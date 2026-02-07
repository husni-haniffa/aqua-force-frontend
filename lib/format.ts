export const formateDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

export const formateTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number)
    const period = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 === 0 ? 12 : hour % 12
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`
}