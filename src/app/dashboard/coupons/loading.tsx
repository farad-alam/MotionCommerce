export default function CouponsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 bg-slate-200 rounded w-32 mb-2" />
          <div className="h-4 bg-slate-100 rounded w-44" />
        </div>
        <div className="h-10 bg-slate-200 rounded-lg w-36" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-dashed border-slate-200 rounded-2xl p-5 space-y-3" style={{ opacity: 1 - i * 0.08 }}>
            {/* Code badge */}
            <div className="flex items-center justify-between">
              <div className="h-7 bg-slate-200 rounded-lg w-32" />
              <div className="h-5 bg-slate-100 rounded-full w-14" />
            </div>
            {/* Details */}
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className="h-4 bg-slate-100 rounded w-3/4" />
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div className="h-3 bg-slate-100 rounded w-20" />
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-slate-100 rounded-lg" />
                <div className="w-8 h-8 bg-slate-100 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
