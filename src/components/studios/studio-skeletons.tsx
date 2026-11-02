import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function StudioCardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-live="polite" className="space-y-6">
      <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
        <progress
          aria-label="Loading studio workspaces"
          className="loading-spinner"
          style={{ ["--size" as string]: "22px", ["--thickness" as string]: "2.5px" }}
        />
        <span>Loading studio workspaces...</span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <Card
            key={index}
            className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xs"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <Skeleton className="size-full rounded-none" />
              </div>

              <CardHeader className="space-y-2.5 px-5 pt-5 pb-2">
                <Skeleton className="h-3.5 w-32 rounded-md" />
                <Skeleton className="h-5 w-4/5 rounded-md" />
              </CardHeader>

              <CardContent className="space-y-3 px-5 pb-4">
                <div className="flex items-center justify-between gap-4">
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-6 w-24 rounded-md" />
                  <Skeleton className="h-6 w-28 rounded-md" />
                  <Skeleton className="h-6 w-20 rounded-md" />
                </div>
              </CardContent>
            </div>

            <CardFooter className="mt-auto flex items-center justify-between border-t border-border bg-muted/30 px-5 py-4">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>
              <Skeleton className="h-10 w-28 rounded-lg" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function StudioDetailsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-9 w-36 rounded-lg" />
        <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
          <progress
            aria-label="Loading studio details"
            className="loading-spinner"
            style={{ ["--size" as string]: "22px", ["--thickness" as string]: "2.5px" }}
          />
          <span>Loading studio specifications...</span>
        </div>
      </div>

      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-full" />
        </div>
        <Skeleton className="h-10 w-3/4 max-w-2xl rounded-xl" />
      </div>

      {/* Gallery Carousel Skeleton */}
      <div className="mb-12 space-y-3.5">
        <Skeleton className="aspect-[16/9] w-full rounded-3xl sm:aspect-[21/10]" />
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="aspect-[16/10] w-full rounded-xl" />
          ))}
        </div>
      </div>

      {/* Two-Column Details + Booking Card Skeleton */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <div className="space-y-5 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-8 w-64 rounded-lg" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="h-24 w-full rounded-2xl" />
              ))}
            </div>
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-11/12 rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <Skeleton className="h-7 w-60 rounded-lg" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="h-14 w-full rounded-2xl" />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-md">
            <div className="flex items-center justify-between">
              <Skeleton className="h-9 w-28 rounded-lg" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

