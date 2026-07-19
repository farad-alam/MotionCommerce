export default function CheckoutLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      {/* Heading */}
      <div className="h-8 bg-slate-200 rounded-lg w-40 mb-8" />

      {/* Step indicator */}
      <div className="flex items-center gap-4 mb-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div className="h-4 bg-slate-100 rounded w-20" />
            {i < 2 && <div className="h-0.5 bg-slate-200 w-10" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-40 mb-2" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={i === 4 || i === 5 ? "col-span-2" : ""}>
                  <div className="h-3 bg-slate-100 rounded w-24 mb-2" />
                  <div className="h-11 bg-slate-100 rounded-lg w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Payment section */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-48 mb-2" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg">
                <div className="w-5 h-5 bg-slate-200 rounded-full" />
                <div className="h-4 bg-slate-100 rounded w-32" />
              </div>
            ))}
          </div>

          <div className="h-12 bg-slate-200 rounded-xl w-full" />
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sticky top-24 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-36 mb-2" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-20" />
                  <div className="h-4 bg-slate-200 rounded w-16" />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-slate-100 rounded w-20" />
                  <div className="h-4 bg-slate-200 rounded w-16" />
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200">
              <div className="h-5 bg-slate-200 rounded w-16" />
              <div className="h-5 bg-slate-300 rounded w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
