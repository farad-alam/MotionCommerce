export default function CartLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-24 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 bg-white border border-slate-100 rounded-xl p-4">
              <div className="w-24 h-24 bg-slate-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-32" />
                <div className="flex items-center justify-between mt-2">
                  <div className="h-9 bg-slate-100 rounded-lg w-28" />
                  <div className="h-5 bg-slate-200 rounded w-20" />
                </div>
              </div>
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sticky top-24 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-36" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-slate-100 rounded w-24" />
                <div className="h-4 bg-slate-200 rounded w-16" />
              </div>
            ))}
            <div className="h-px bg-slate-200" />
            <div className="flex justify-between">
              <div className="h-5 bg-slate-200 rounded w-16" />
              <div className="h-5 bg-slate-300 rounded w-24" />
            </div>
            <div className="h-12 bg-slate-200 rounded-xl w-full" />
            <div className="h-10 bg-slate-100 rounded-xl w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
