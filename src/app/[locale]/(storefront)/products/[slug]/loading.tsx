export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-3 bg-slate-200 rounded w-16" />
        <div className="h-3 bg-slate-100 rounded w-2" />
        <div className="h-3 bg-slate-200 rounded w-24" />
        <div className="h-3 bg-slate-100 rounded w-2" />
        <div className="h-3 bg-slate-200 rounded w-36" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="aspect-square bg-slate-200 rounded-2xl w-full" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-slate-100 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <div className="h-4 bg-slate-100 rounded w-24 mb-3" />
            <div className="h-9 bg-slate-200 rounded-lg w-full mb-2" />
            <div className="h-9 bg-slate-200 rounded-lg w-3/4" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-slate-200 rounded" />
              ))}
            </div>
            <div className="h-4 bg-slate-100 rounded w-24" />
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <div className="h-10 bg-slate-200 rounded w-36" />
            <div className="h-6 bg-slate-100 rounded w-24" />
          </div>

          {/* Variants */}
          <div>
            <div className="h-4 bg-slate-200 rounded w-16 mb-3" />
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-9 bg-slate-100 rounded-lg w-20" />
              ))}
            </div>
          </div>

          {/* Qty + Cart */}
          <div className="flex gap-3 pt-2">
            <div className="h-12 bg-slate-100 rounded-xl w-28" />
            <div className="h-12 bg-slate-200 rounded-xl flex-1" />
          </div>

          {/* Wishlist / Share */}
          <div className="flex gap-3">
            <div className="h-10 bg-slate-100 rounded-lg w-32" />
            <div className="h-10 bg-slate-100 rounded-lg w-28" />
          </div>

          {/* Description */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-4 bg-slate-100 rounded ${i === 4 ? "w-2/3" : "w-full"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews section skeleton */}
      <div className="mt-16">
        <div className="h-7 bg-slate-200 rounded w-40 mb-6" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full" />
                <div className="space-y-1">
                  <div className="h-4 bg-slate-200 rounded w-28" />
                  <div className="h-3 bg-slate-100 rounded w-20" />
                </div>
              </div>
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
