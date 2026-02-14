export default function Loading() {
  return (
    <div className="px-4 py-6 space-y-4 animate-pulse">
      {/* Hero skeleton */}
      <div className="rounded-2xl bg-holi-surface h-48 w-full" />

      {/* Timer skeleton */}
      <div className="rounded-xl bg-holi-surface h-20 w-full" />

      {/* Quick nav skeleton */}
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-holi-surface h-20" />
        ))}
      </div>

      {/* Section skeletons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="rounded-lg bg-holi-surface h-6 w-40" />
          <div className="rounded-xl bg-holi-surface h-32 w-full" />
        </div>
      ))}
    </div>
  );
}
