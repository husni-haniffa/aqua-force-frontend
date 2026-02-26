import { Skeleton } from "@/components/ui/skeleton";

export const EventCardsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 pt-12 xl:pt-24 pb-16 xl:pb-24">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-fit"
                >
                {/* Image */}
                <Skeleton className="w-full h-48 rounded-none" />

                <div className="px-4 py-4 flex flex-col gap-6">

                    {/* Title badge (amber pill) */}
                    <Skeleton className="h-6 w-28 rounded-md" />

                    <div className="mb-4">

                    {/* Description */}
                    <div className="space-y-2 mb-6">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-4/5" />
                    </div>

                    {/* Date / Time / Location rows */}
                    <div className="flex flex-col gap-4">

                        {/* Date */}
                        <div className="flex items-center gap-6">
                        <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                        <Skeleton className="h-4 w-32" />
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-6">
                        <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                        <Skeleton className="h-4 w-24" />
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-6">
                        <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                        <Skeleton className="h-4 w-40" />
                        </div>

                    </div>
                    </div>

                    {/* Add to Calendar button */}
                    <Skeleton className="h-9 w-full rounded-md" />

                </div>
                </div>
            ))}
        </div>
    );
};