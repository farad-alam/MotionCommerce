export default function DashboardProductsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 bg-slate-200 rounded w-32 mb-2" />
          <div className="h-4 bg-slate-100 rounded w-48" />
        </div>
        <div className="h-10 bg-slate-200 rounded-lg w-36" />
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3">
        <div className="h-9 bg-slate-100 rounded-lg w-64" />
        <div className="h-9 bg-slate-100 rounded-lg w-32" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl overflow-hidden" style={{ opacity: 1 - i * 0.04 }}>
            <div className="aspect-square bg-slate-200 w-full" />
            <div className="p-4 space-y-2">
              <div className="h-5 bg-slate-200 rounded w-full" />
              <div className="flex items-center justify-between">
                <div className="h-4 bg-slate-100 rounded w-20" />
                <div className="h-5 bg-slate-200 rounded w-16" />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <div className="h-5 bg-slate-100 rounded w-14" />
                <div className="h-5 bg-slate-100 rounded w-14" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
