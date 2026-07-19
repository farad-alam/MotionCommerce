export default function AccountLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-10 pb-8 border-b border-slate-100">
        <div className="w-20 h-20 bg-slate-200 rounded-full flex-shrink-0" />
        <div className="space-y-2">
          <div className="h-7 bg-slate-200 rounded w-48" />
          <div className="h-4 bg-slate-100 rounded w-32" />
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`h-9 bg-slate-200 rounded-lg flex-shrink-0 ${i === 0 ? "w-28" : "w-24"}`} />
        ))}
      </div>

      {/* Content area */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 bg-slate-200 rounded w-36" />
              <div className="h-5 bg-slate-100 rounded w-20" />
            </div>
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className="h-4 bg-slate-100 rounded w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
