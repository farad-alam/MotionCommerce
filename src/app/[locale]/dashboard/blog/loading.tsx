export default function BlogDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 bg-slate-200 rounded w-24 mb-2" />
          <div className="h-4 bg-slate-100 rounded w-40" />
        </div>
        <div className="h-10 bg-slate-200 rounded-lg w-28" />
      </div>

      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 bg-white border border-slate-100 rounded-xl px-5 py-4" style={{ opacity: 1 - i * 0.06 }}>
            <div className="w-14 h-14 bg-slate-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="h-6 bg-slate-100 rounded-full w-20" />
              <div className="h-3 bg-slate-100 rounded w-20" />
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-slate-100 rounded-lg" />
              <div className="w-8 h-8 bg-slate-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
