export default function ReviewsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 bg-slate-200 rounded w-28 mb-2" />
          <div className="h-4 bg-slate-100 rounded w-44" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl p-4">
            <div className="h-7 bg-slate-200 rounded w-12 mb-1" />
            <div className="h-4 bg-slate-100 rounded w-24" />
          </div>
        ))}
      </div>

      {/* Review rows */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-3 bg-slate-200 rounded flex-1" />
          ))}
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-50" style={{ opacity: 1 - i * 0.07 }}>
            <div className="flex-1 h-4 bg-slate-100 rounded" />
            <div className="flex-1 h-4 bg-slate-100 rounded" />
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="w-3 h-3 bg-slate-200 rounded" />
              ))}
            </div>
            <div className="flex-1 h-4 bg-slate-100 rounded" />
            <div className="flex-shrink-0 h-4 bg-slate-100 rounded w-16" />
            <div className="flex-shrink-0 h-5 bg-slate-200 rounded-full w-20" />
            <div className="flex gap-2 flex-shrink-0">
              <div className="w-7 h-7 bg-slate-100 rounded" />
              <div className="w-7 h-7 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
