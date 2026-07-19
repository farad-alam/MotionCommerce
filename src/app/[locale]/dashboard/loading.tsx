import { LayoutDashboard } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="p-6 md:p-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <div className="h-8 bg-slate-200 rounded-md w-64 mb-2"></div>
          <div className="h-4 bg-slate-100 rounded-md w-48"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded-lg w-full sm:w-40"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="h-5 bg-slate-100 rounded w-24"></div>
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-200">
                <LayoutDashboard className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="h-8 bg-slate-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-slate-100 rounded w-40"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 h-96">
            <div className="h-6 bg-slate-200 rounded w-48 mb-6"></div>
            <div className="h-full bg-slate-50 rounded-xl"></div>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 h-96">
            <div className="h-6 bg-slate-200 rounded w-40 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
