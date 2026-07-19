export default function InventoryLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-slate-200 rounded" />
        <div>
          <div className="h-7 bg-slate-200 rounded w-32 mb-1" />
          <div className="h-4 bg-slate-100 rounded w-48" />
        </div>
      </div>

      {/* Alert banners */}
      <div className="flex gap-4">
        <div className="h-12 bg-red-50 border border-red-100 rounded-lg flex-1" />
        <div className="h-12 bg-amber-50 border border-amber-100 rounded-lg flex-1" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-3 bg-slate-200 rounded flex-1" />
          ))}
        </div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-50" style={{ opacity: 1 - i * 0.06 }}>
            <div className="flex-1 h-4 bg-slate-100 rounded" />
            <div className="flex-1 h-4 bg-slate-100 rounded" />
            <div className="flex-1 h-4 bg-slate-100 rounded" />
            <div className="flex-shrink-0 w-10 h-7 bg-slate-200 rounded-md" />
            <div className="flex-shrink-0 h-4 bg-slate-100 rounded w-12" />
            <div className="flex-shrink-0 h-5 bg-slate-200 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
