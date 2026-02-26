import { Skeleton } from "@/components/ui/skeleton"

export const UserInfoSkeleton = () => {
    return (
        <div className="flex flex-col gap-0.5">
            <Skeleton className="h-10 w-40"/>
        </div>
    )
    
}

export const UserNameSkeleton = () => {
    return (
        <div>
            <header>
                <Skeleton className="h-15 w-35"/>
            </header>
        </div>
    )
    
}



