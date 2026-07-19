function TableSkeleton({ rows = 8, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-pulse">
      {/* Table header */}
      <div className="flex gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50">
        {[...Array(cols)].map((_, i) => (
          <div key={i} className={`h-3 bg-slate-200 rounded flex-1 ${i === 0 ? "max-w-[180px]" : ""}`} />
        ))}
      </div>
      {/* Rows */}
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-50">
          {[...Array(cols)].map((_, j) => (
            <div
              key={j}
              className={`h-4 bg-slate-100 rounded flex-1 ${j === 0 ? "max-w-[180px]" : ""}`}
              style={{ opacity: 1 - i * 0.07 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function DashboardTableLoading({ title = "Loading..." }: { title?: string }) {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 bg-slate-200 rounded w-48 mb-2" />
          <div className="h-4 bg-slate-100 rounded w-32" />
        </div>
        <div className="h-10 bg-slate-200 rounded-lg w-32" />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3">
        <div className="h-9 bg-slate-100 rounded-lg w-44" />
        <div className="h-9 bg-slate-100 rounded-lg w-32" />
        <div className="h-9 bg-slate-100 rounded-lg w-32" />
      </div>

      <TableSkeleton />

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="h-4 bg-slate-100 rounded w-32" />
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-9 h-9 bg-slate-100 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
