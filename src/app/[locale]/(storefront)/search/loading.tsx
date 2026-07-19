export default function SearchLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      {/* Search bar skeleton */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="h-14 bg-slate-200 rounded-2xl w-full" />
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 bg-slate-100 rounded w-48" />
        <div className="h-9 bg-slate-100 rounded-lg w-32" />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <div className="aspect-[4/5] bg-slate-200 w-full" />
            <div className="p-4 space-y-2">
              <div className="h-3 bg-slate-100 rounded w-20" />
              <div className="h-5 bg-slate-200 rounded w-full" />
              <div className="h-5 bg-slate-200 rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
