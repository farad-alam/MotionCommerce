export default function HomepageLoading() {
  return (
    <div className="animate-pulse w-full overflow-hidden">
      {/* Hero skeleton */}
      <div className="relative w-full bg-slate-200" style={{ minHeight: "520px" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-300/60 to-slate-200/30" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col gap-5">
          <div className="h-4 bg-slate-300 rounded-full w-28 mb-2" />
          <div className="h-14 bg-slate-300 rounded-xl w-2/3 mb-1" />
          <div className="h-14 bg-slate-200 rounded-xl w-1/2" />
          <div className="h-5 bg-slate-200 rounded-md w-80 mt-2" />
          <div className="flex gap-3 mt-4">
            <div className="h-12 bg-slate-300 rounded-full w-36" />
            <div className="h-12 bg-slate-200 rounded-full w-32" />
          </div>
        </div>
      </div>

      {/* Category strip skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="h-7 bg-slate-200 rounded-md w-48 mb-6" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-slate-200 rounded-full" />
              <div className="h-3 bg-slate-200 rounded w-14" />
            </div>
          ))}
        </div>
      </div>

      {/* Product grid skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="h-7 bg-slate-200 rounded-md w-44" />
          <div className="h-5 bg-slate-100 rounded w-20" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
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

      {/* Newsletter / banner skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="h-40 bg-slate-200 rounded-2xl w-full" />
      </div>
    </div>
  );
}
