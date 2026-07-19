export default function BuilderLoading() {
  return (
    <div className="min-h-screen bg-neutral-950 p-4 lg:p-8 animate-pulse text-white">
      <div className="max-w-6xl mx-auto">
        <div className="h-8 bg-neutral-800 rounded w-64 mb-8"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content skeleton */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
              <div className="h-6 bg-neutral-800 rounded w-48 mb-2"></div>
              <div className="h-4 bg-neutral-800 rounded w-72 mb-8"></div>
              
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-neutral-800 rounded w-32"></div>
                    <div className="h-12 bg-neutral-800/50 rounded-lg w-full"></div>
                  </div>
                ))}
                
                <div className="flex justify-end gap-3 pt-6 border-t border-neutral-800">
                  <div className="h-10 w-24 bg-neutral-800 rounded-lg"></div>
                  <div className="h-10 w-32 bg-indigo-500/20 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar skeleton */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="h-5 bg-neutral-800 rounded w-32 mb-4"></div>
              <div className="h-32 bg-neutral-800/50 rounded-lg w-full"></div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="h-5 bg-neutral-800 rounded w-40 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-neutral-800/50 rounded w-full"></div>
                <div className="h-4 bg-neutral-800/50 rounded w-full"></div>
                <div className="h-4 bg-neutral-800/50 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
