import { Skeleton } from "@/components/ui/skeleton";

export const NewsCardsSkeleton = () => {
    return (
    <div className="container columns-1 md:columns-2 gap-9 space-y-9 pt-12 xl:pt-24 pb-16 xl:pb-24">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden break-inside-avoid"
        >
          {/* Image */}
          <Skeleton className="w-full h-50 rounded-none" />

          <div className="px-4 py-2">
            <div className="flex flex-col gap-4 mb-6 mt-3">

              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

            </div>

            {/* Footer: date + CTA */}
            <div className="border-t">
              <div className="flex items-center justify-between mt-6">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-32" />
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
        <div className="container pt-16 xl:pt-24 pb-16 xl:pb-24">
            <article>

                {/* Image */}
                <Skeleton className="w-full h-100 rounded-lg" />

                <div className="flex flex-col gap-6 mt-6 mb-6">

                {/* Title */}
                <div className="space-y-2">
                    <Skeleton className="h-7 w-full" />
                    <Skeleton className="h-7 w-3/4" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>

                </div>

                {/* Footer: date + CTA */}
                <div className="border-t">
                <div className="mt-6 flex items-center justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-36" />
                </div>
                </div>

            </article>
        </div>
    );
};