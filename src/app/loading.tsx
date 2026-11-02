export default function RootLoading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="flex min-h-[65vh] flex-col items-center justify-center gap-4 px-4"
    >
      <progress
        aria-label="Loading StudioSpace page"
        className="loading-spinner"
      />
      <p className="text-sm font-medium text-muted-foreground">
        Loading StudioSpace...
      </p>
    </div>
  );
}

