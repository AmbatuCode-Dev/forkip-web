export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="flex flex-col gap-3 border-b border-border pb-10">
        <div className="h-4 w-44 animate-pulse rounded-sm bg-muted" />
        <div className="h-9 w-64 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-full max-w-xl animate-pulse rounded-sm bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-28 animate-pulse rounded-lg border border-border bg-surface" />
        <div className="h-28 animate-pulse rounded-lg border border-border bg-surface" />
        <div className="h-28 animate-pulse rounded-lg border border-border bg-surface" />
        <div className="h-28 animate-pulse rounded-lg border border-border bg-surface" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
