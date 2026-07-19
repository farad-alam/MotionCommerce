export default function CategoriesDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 bg-slate-200 rounded w-36 mb-2" />
          <div className="h-4 bg-slate-100 rounded w-44" />
        </div>
        <div className="h-10 bg-slate-200 rounded-lg w-36" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 bg-white border border-slate-100 rounded-xl px-4 py-3" style={{ opacity: 1 - i * 0.06 }}>
            <div className="w-12 h-12 bg-slate-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-32" />
              <div className="h-3 bg-slate-100 rounded w-20" />
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-slate-100 rounded" />
              <div className="w-8 h-8 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
