import { getCategories } from "@/lib/storefront-data";
import Link from "next/link";
import { Folder } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Categories",
  description: "Browse all product categories.",
};

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const categories = await getCategories();

  // Get only top-level categories
  const topLevelCategories = categories.filter((c) => !c.parentId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Shop by Category</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore our wide range of products organized by category.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topLevelCategories.map((category) => (
          <Link 
            key={category.id}
            href={`/${locale}/products?category=${category.slug}`}
            className="group flex flex-col items-center text-center bg-white rounded-2xl border border-slate-200 p-8 hover:border-indigo-500 hover:shadow-lg transition-all"
          >
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              {category.image ? (
                <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <Folder className="w-8 h-8" />
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h2>
            {category.description && (
              <p className="text-sm text-slate-500 line-clamp-2">{category.description}</p>
            )}
            
            {/* Show up to 3 subcategories */}
            {category.children && category.children.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {category.children.slice(0, 3).map(child => (
                  <span key={child.id} className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    {child.name}
                  </span>
                ))}
                {category.children.length > 3 && (
                  <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                    +{category.children.length - 3} more
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
