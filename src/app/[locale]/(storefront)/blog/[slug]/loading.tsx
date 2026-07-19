export default function BlogPostLoading() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-3 bg-slate-200 rounded w-12" />
        <div className="h-3 bg-slate-100 rounded w-2" />
        <div className="h-3 bg-slate-200 rounded w-36" />
      </div>

      {/* Category + meta */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-5 bg-slate-200 rounded-full w-20" />
        <div className="h-3 bg-slate-100 rounded w-px" />
        <div className="h-3 bg-slate-100 rounded w-28" />
      </div>

      {/* Title */}
      <div className="space-y-3 mb-8">
        <div className="h-10 bg-slate-200 rounded-lg w-full" />
        <div className="h-10 bg-slate-200 rounded-lg w-4/5" />
        <div className="h-10 bg-slate-100 rounded-lg w-2/3" />
      </div>

      {/* Author + date */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="w-10 h-10 bg-slate-200 rounded-full" />
        <div className="space-y-1">
          <div className="h-4 bg-slate-200 rounded w-28" />
          <div className="h-3 bg-slate-100 rounded w-24" />
        </div>
      </div>

      {/* Hero image */}
      <div className="aspect-video bg-slate-200 rounded-2xl w-full mb-10" />

      {/* Body paragraphs */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className={`h-4 bg-slate-100 rounded ${i % 2 === 0 ? "w-4/5" : "w-3/5"}`} />
          </div>
        ))}
      </div>
    </article>
  );
}
