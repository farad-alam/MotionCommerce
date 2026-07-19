import { getCategories } from "@/lib/storefront-data";
import Link from "next/link";

export async function CategoryGridSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const allCategories = await getCategories();
  
  // Take top level categories up to limit
  const categories = allCategories
    .filter((c: any) => !c.parentId)
    .slice(0, settings.limit || 6);

  const variant = settings.variant || "default";

  if (variant === "cards") {
    return (
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">{settings.title}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat: any) => (
              <Link 
                key={cat.id} 
                href={`/${locale}/products?category=${cat.slug}`}
                className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center hover:shadow-md hover:border-indigo-500 transition-all"
              >
                <div className="w-16 h-16 mx-auto bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-2xl">📁</span>
                  )}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default Variant - Image Grid
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">{settings.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat: any) => (
            <Link 
              key={cat.id} 
              href={`/${locale}/products?category=${cat.slug}`}
              className="group relative h-64 rounded-2xl overflow-hidden block"
            >
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors z-10" />
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="absolute inset-0 bg-indigo-600 group-hover:scale-105 transition-transform duration-500" />
              )}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {cat.name}
                </h3>
                <span className="text-white/80 text-sm font-medium flex items-center gap-2 group-hover:text-white transition-colors">
                  Shop Now <span className="text-xl leading-none">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
