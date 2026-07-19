import { getCategories } from "@/lib/storefront-data";
import Link from "next/link";

export async function CategoryGridSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const allCategories = await getCategories();
  
  // Take top level categories up to limit
  const categories = allCategories
    .filter((c: any) => !c.parentId)
    .slice(0, settings.limit || 6);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">{settings.title}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat: any) => (
            <Link 
              key={cat.id} 
              href={`/${locale}/products?category=${cat.slug}`}
              className="group bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-md hover:border-indigo-500 transition-all"
            >
              <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-2xl">📁</span>
                )}
              </div>
              <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
