import { getProducts } from "@/lib/storefront-data";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Search } from "lucide-react";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; sort?: string }>;
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params;
  const { q = "", sort } = await searchParams;

  // Wait for both parameters
  const [localeValue, queryValue] = await Promise.all([locale, q]);

  const { products, total } = await getProducts({ 
    search: queryValue, 
    limit: 50,
    // Add sorting mapping if provided
    ...(sort === "price-asc" ? { sortBy: "price", sortOrder: "asc" } : {}),
    ...(sort === "price-desc" ? { sortBy: "price", sortOrder: "desc" } : {}),
    ...(sort === "newest" ? { sortBy: "createdAt", sortOrder: "desc" } : {}),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-[60vh]">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Search className="w-8 h-8 text-indigo-600" />
          {queryValue ? `Search results for "${queryValue}"` : "Search Products"}
        </h1>
        <p className="text-slate-500 mt-2">{total} product{total !== 1 ? 's' : ''} found</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product as any} locale={localeValue} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 border border-slate-100 rounded-2xl">
          <Search className="w-12 h-12 text-slate-300 mb-4" />
          <h2 className="text-lg font-semibold text-slate-900">No results found</h2>
          <p className="text-slate-500 mt-1 max-w-sm">We couldn't find any products matching your search query. Try checking your spelling or using more general terms.</p>
        </div>
      )}
    </div>
  );
}
