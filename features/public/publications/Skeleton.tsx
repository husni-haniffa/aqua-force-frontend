import { Skeleton } from "@/components/ui/skeleton"

export function PublicationCardSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-9 pt-12 xl:pt-24 pb-16 xl:pb-24">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 flex flex-col h-full">
            
            {/* Category badge */}
            <div className="mb-4">
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
            
            {/* Title */}
            <header className="mb-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2" />
            </header>
            
            {/* Author */}
            <div className="flex items-center gap-1 mb-4">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            
            {/* Abstract */}
            <div className="flex-1 mb-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            
            {/* Keywords */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-14 rounded-md" />
                <Skeleton className="h-6 w-18 rounded-md" />
              </div>
            </div>
            
            {/* Read link */}
            <div className="flex justify-end">
              <Skeleton className="h-4 w-40" />
            </div>
            
          </div>
        </div>
      ))}
    </div>
  )
}

export const ReadPublicationSkeleton = () => {
    return (
        <div className='pt-16 xl:pt-24 pb-16 xl:pb-24'>
            <div className='container'>
                <article>  
                    <header className="mb-8">            
                        <div className="mb-4">
                            {/* Category badge skeleton */}
                            <Skeleton className='h-6 w-24 rounded-md' />                     
                        </div>               
                        
                        {/* Title skeleton - 2 lines */}
                        <Skeleton className="h-7 md:h-8 w-full mb-3" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                            {/* Author skeleton */}
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>                               
                        
                        {/* Keywords skeleton */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            <Skeleton className="h-7 w-20 rounded-md" />
                            <Skeleton className="h-7 w-24 rounded-md" />
                            <Skeleton className="h-7 w-28 rounded-md" />
                            <Skeleton className="h-7 w-16 rounded-md" />
                        </div>
                        
                        <div>
                            {/* Published date skeleton */}
                            <Skeleton className="h-4 w-40" />
                        </div>
                          
                    </header>
                       
                    <section className="mb-6">
                        {/* Abstract heading skeleton */}
                        <Skeleton className="h-6 md:h-7 w-32 mb-4" />
                        
                        {/* Abstract content skeleton - multiple lines */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </section>
                        
                    <div className="pt-6 border-t border-slate-200">
                        <div className="flex justify-end">
                            {/* Download button skeleton */}
                            <Skeleton className="h-10 w-28 rounded-md" />                       
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};