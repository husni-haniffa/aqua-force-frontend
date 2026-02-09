import { Skeleton } from "@/components/ui/skeleton";

export const EventCardsSkeleton = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-9'>
            {[...Array(6)].map((_, index) => (
                <div key={index} className='bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden'>
                    <div className='px-4 py-4'>
                        <header className='flex flex-col mb-4'>
                            <Skeleton className='h-6 w-16 rounded-md mb-3' />
                            <Skeleton className='h-6 w-full' />
                        </header>
                        
                        <div className='space-y-3'>
                            {/* Date */}
                            <div className='flex items-center gap-3'>
                                <Skeleton className='h-10 w-10 rounded-lg' />
                                <Skeleton className='h-4 w-32' />
                            </div>

                            {/* Time */}
                            <div className='flex items-center gap-3'>
                                <Skeleton className='h-10 w-10 rounded-lg' />
                                <Skeleton className='h-4 w-24' />
                            </div>

                            {/* Location */}
                            <div className='flex items-center gap-3'>
                                <Skeleton className='h-10 w-10 rounded-lg' />
                                <Skeleton className='h-4 w-40' />
                            </div>
                        </div>

                        <div className='mt-5 pt-4 border-t border-slate-100'>
                            <Skeleton className='h-10 w-full rounded-lg' />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};