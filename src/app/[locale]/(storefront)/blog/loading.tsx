export default function BlogLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
      {/* Page heading */}
      <div className="text-center mb-12">
        <div className="h-10 bg-slate-200 rounded-lg w-36 mx-auto mb-3" />
        <div className="h-5 bg-slate-100 rounded w-64 mx-auto" />
      </div>

      {/* Featured post */}
      <div className="mb-10 bg-white border border-slate-100 rounded-2xl overflow-hidden lg:flex">
        <div className="aspect-video lg:w-1/2 bg-slate-200" />
        <div className="p-8 flex flex-col gap-4 flex-1">
          <div className="h-3 bg-slate-100 rounded w-24" />
          <div className="h-8 bg-slate-200 rounded-lg w-full" />
          <div className="h-8 bg-slate-200 rounded-lg w-3/4" />
          <div className="space-y-2 mt-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`h-4 bg-slate-100 rounded ${i === 2 ? "w-2/3" : "w-full"}`} />
            ))}
          </div>
          <div className="h-10 bg-slate-200 rounded-lg w-32 mt-auto" />
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <div className="aspect-video bg-slate-200 w-full" />
            <div className="p-5 space-y-3">
              <div className="h-3 bg-slate-100 rounded w-20" />
              <div className="h-5 bg-slate-200 rounded w-full" />
              <div className="h-5 bg-slate-100 rounded w-3/4" />
              <div className="h-8 bg-slate-100 rounded-lg w-24 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
