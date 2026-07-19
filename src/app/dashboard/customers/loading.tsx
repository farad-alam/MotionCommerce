function TableRowSkeleton({ cols }: { cols: number }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-50">
      {[...Array(cols)].map((_, j) => (
        <div key={j} className="h-4 bg-slate-100 rounded flex-1" />
      ))}
    </div>
  );
}

export default function CustomersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 bg-slate-200 rounded w-36 mb-2" />
          <div className="h-4 bg-slate-100 rounded w-44" />
        </div>
        <div className="h-9 bg-slate-100 rounded-lg w-48" />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 bg-slate-200 rounded flex-1" />
          ))}
        </div>
        {[...Array(10)].map((_, i) => (
          <TableRowSkeleton key={i} cols={5} />
        ))}
      </div>
    </div>
  );
}
