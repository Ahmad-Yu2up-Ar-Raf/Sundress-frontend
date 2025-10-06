import { Skeleton } from "@/components/ui/fragments/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="md:min-h-[45svh]  min-h-[35svh] bg-accent-foreground w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 max-w-xs w-full  bg-accent-foreground" />
        <Skeleton className="h-4 max-w-xs w-full  bg-accent-foreground" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 max-w-xs w-full  bg-accent-foreground" />
        <Skeleton className="h-4 max-w-xs w-full  bg-accent-foreground" />
      </div>
    </div>
  )
}
