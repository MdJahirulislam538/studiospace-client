import { StudioCardGridSkeleton } from "@/components/studios/studio-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudiosLoading() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl space-y-3">
          <Skeleton className="h-7 w-52 rounded-full" />
          <Skeleton className="h-10 w-80 rounded-xl" />
          <Skeleton className="h-5 w-96 max-w-full rounded-md" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-9 w-28 rounded-lg" />
          ))}
        </div>
      </div>

      <StudioCardGridSkeleton count={6} />
    </section>
  );
}

