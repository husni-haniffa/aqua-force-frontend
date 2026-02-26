import { Skeleton } from "@/components/ui/skeleton";

export function AdminOverviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="relative overflow-hidden bg-slate-200 rounded-xl shadow-lg p-6">
          {/* Decorative circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-300/60 rounded-full -mr-16 -mt-16" />
          <div className="relative flex flex-col gap-4">
            <Skeleton className="w-12 h-12 rounded-lg bg-slate-300" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-36 bg-slate-300" />
              <Skeleton className="h-4 w-48 bg-slate-300" />
            </div>
            <Skeleton className="h-10 w-16 bg-slate-300" />
            <Skeleton className="h-9 w-full rounded-md bg-slate-300" />
          </div>
        </div>
      ))}
    </div>
  )
}