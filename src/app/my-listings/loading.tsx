import { StudioCardGridSkeleton } from "@/components/studios/studio-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyListingsLoading() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end">
        <div className="space-y-2.5">
          <Skeleton className="h-7 w-44 rounded-full" />
          <Skeleton className="h-10 w-72 rounded-xl" />
          <Skeleton className="h-5 w-80 rounded-md" />
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      <StudioCardGridSkeleton count={3} />
    </section>
  );
}

