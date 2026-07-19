export default function CategoriesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
      <div className="text-center mb-12">
        <div className="h-9 bg-slate-200 rounded-lg w-40 mx-auto mb-3" />
        <div className="h-5 bg-slate-100 rounded w-56 mx-auto" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="group flex flex-col items-center">
            <div className="w-full aspect-square bg-slate-200 rounded-2xl mb-3" />
            <div className="h-5 bg-slate-200 rounded w-24 mb-1" />
            <div className="h-3 bg-slate-100 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
