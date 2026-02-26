import { Skeleton } from "@/components/ui/skeleton"

export function PublicationCardSkeleton() {
  return (
   <div className="grid grid-cols-1 xl:grid-cols-2 gap-9 pt-12 xl:pt-24 pb-16 xl:pb-24">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full"
        >
          <div className="px-5 py-5 flex flex-col h-full gap-4">

            {/* Top row: Category + Date */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
            </div>

            {/* Author row: avatar initial + name + research type badge */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-7 h-7 rounded-full shrink-0" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-24 rounded-full ml-auto" />
            </div>

            {/* Abstract */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-14 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-12 rounded-md" />
            </div>

            {/* Footer: Social links + CTA */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              {/* Social media icon placeholders */}
              <div className="flex items-center gap-2">
                <Skeleton className="w-7 h-7 rounded-full" />
                <Skeleton className="w-7 h-7 rounded-full" />
                <Skeleton className="w-7 h-7 rounded-full" />
              </div>
              {/* Read Full Publication CTA */}
              <Skeleton className="h-8 w-40 rounded-lg" />
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}

export const ReadPublicationSkeleton = () => {
    return (
      <div className="pt-16 xl:pt-24 pb-16 xl:pb-24">
        <div className="container">
          <div>

            {/* Category + Date */}
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-4 w-36" />
            </div>

            <div className="flex flex-col gap-6 mb-6">

              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-7 w-3/4" />
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                <Skeleton className="h-4 w-36" />
              </div>

              {/* Research type */}
              <Skeleton className="h-4 w-40" />

              {/* Abstract section */}
              <div className="flex flex-col gap-4">
                <Skeleton className="h-7 w-28" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>

            </div>

            {/* Border section */}
            <div className="border-t pt-6 space-y-4">

              {/* Keywords */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-14 rounded-md" />
                <Skeleton className="h-6 w-24 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>

              {/* Social links + Download button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Social icons */}
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
                {/* Download CTA */}
                <Skeleton className="h-9 w-32 rounded-md" />
              </div>

            </div>

          </div>
        </div>
      </div>
    );
};