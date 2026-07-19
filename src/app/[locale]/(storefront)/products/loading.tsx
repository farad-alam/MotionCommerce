import { SlidersHorizontal } from "lucide-react";

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
      {/* Page header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="h-8 bg-slate-200 rounded-md w-48 mb-2"></div>
          <div className="h-4 bg-slate-100 rounded-md w-32"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded-lg w-full sm:w-72"></div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="space-y-6">
            <div>
              <div className="h-5 bg-slate-200 rounded w-24 mb-4"></div>
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 bg-slate-100 rounded-md w-full"></div>
                ))}
              </div>
            </div>
            <div className="h-px bg-slate-200 w-full"></div>
            <div>
              <div className="h-5 bg-slate-200 rounded w-20 mb-4"></div>
              <div className="h-10 bg-slate-100 rounded-md w-full mb-3"></div>
            </div>
            <div className="h-px bg-slate-200 w-full"></div>
            <div>
              <div className="h-5 bg-slate-200 rounded w-24 mb-4"></div>
              <div className="flex gap-2 mb-3">
                <div className="h-9 bg-slate-100 rounded-md w-full"></div>
                <div className="h-9 bg-slate-100 rounded-md w-full"></div>
              </div>
              <div className="h-8 bg-slate-200 rounded-md w-full"></div>
            </div>
          </div>
        </aside>

        {/* Product grid skeleton */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-full">
                {/* Image */}
                <div className="relative aspect-[4/5] bg-slate-100 w-full"></div>
                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="h-3 bg-slate-100 rounded w-20 mb-2"></div>
                  <div className="h-5 bg-slate-200 rounded w-full mb-4"></div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="h-6 bg-slate-200 rounded w-24"></div>
                    <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
