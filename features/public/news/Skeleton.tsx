import { Skeleton } from "@/components/ui/skeleton";

export const NewsCardsSkeleton = () => {
    return (
        <div className="columns-1 md:columns-2 gap-9 space-y-9 pt-12 xl:pt-24 pb-16 xl:pb-24">
            {[...Array(6)].map((_, index) => (
                <div key={index} className='bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden break-inside-avoid'>
                    <div>
                        {/* Image skeleton */}
                        <Skeleton className="w-full h-50" />
                        
                        <div className="px-2 py-2">
                            <header>
                                {/* Title skeleton */}
                                <Skeleton className="h-6 w-full mb-2" />
                                <Skeleton className="h-6 w-3/4 mb-3" />
                            </header>
                            
                            <div className="space-y-2 mb-4">
                                {/* Content skeleton */}
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>

                            <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                                {/* Date skeleton */}
                                <Skeleton className="h-4 w-24" />
                                
                                {/* Read More skeleton */}
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const NewsArticleSkeleton = () => {
    return (
        <div className='container pt-16 xl:pt-24 pb-16 xl:pb-24'>
            <div>
                <article>
                    <div>
                        <div>
                            {/* Image skeleton */}
                            <Skeleton className="w-full h-100 rounded-lg" />
                            
                            <div className="flex flex-col gap-3 pt-6">
                                <header>
                                    {/* Title skeleton - 2 lines */}
                                    <Skeleton className="h-6 xl:h-7 w-full mb-2" />
                                    <Skeleton className="h-6 xl:h-7 w-3/4 mb-3" />
                                </header>
                                
                                <div className="space-y-2">
                                    {/* Content skeleton - multiple lines */}
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-4/5" />
                                </div>

                                <div className="flex justify-between items-center border-t border-slate-200 pt-6 mt-6">
                                    {/* Date skeleton */}
                                    <Skeleton className="h-4 w-24" />
                                    
                                    {/* Read More link skeleton */}
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};