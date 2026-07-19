import Link from "next/link";
import { getProducts, getCategories } from "@/lib/storefront-data";
import { ProductCard } from "@/components/storefront/ProductCard";
import { ProductSearch } from "@/components/storefront/ProductSearch";
import { ProductFilters } from "@/components/storefront/ProductFilters";

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ 
    category?: string; 
    search?: string; 
    page?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
  }>;
}

export const metadata = {
  title: "All Products",
  description: "Browse our full collection of products.",
};

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = await params;
  const { category, search, page, sort, minPrice, maxPrice, inStock } = await searchParams;

  const currentPage = parseInt(page || "1", 10);
  const limit = 24;
  const skip = (currentPage - 1) * limit;

  let sortBy: "price" | "createdAt" | undefined;
  let sortOrder: "asc" | "desc" | undefined;

  if (sort === "price-asc") { sortBy = "price"; sortOrder = "asc"; }
  if (sort === "price-desc") { sortBy = "price"; sortOrder = "desc"; }
  if (sort === "newest") { sortBy = "createdAt"; sortOrder = "desc"; }

  const [categories, { products, total }] = await Promise.all([
    getCategories(),
    getProducts({ 
      categoryId: category, 
      search, 
      limit, 
      skip,
      sortBy,
      sortOrder,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      inStock: inStock === "true",
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {search ? `Search: "${search}"` : category ? categories.find((c) => c.slug === category)?.name || "Products" : "All Products"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{total} product{total !== 1 ? "s" : ""} found</p>
        </div>
        <ProductSearch initialSearch={search} />
      </div>

      <div className="flex gap-8">
        {/* Sidebar filter */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <ProductFilters categories={categories} locale={locale} />
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product as any} locale={locale} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/${locale}/products?${category ? `category=${category}&` : ""}${search ? `search=${search}&` : ""}page=${p}`}
                      className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${p === currentPage ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-700 hover:border-indigo-400"}`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center text-slate-500">
              <p className="text-lg">No products found.</p>
              {(search || category) && (
                <Link href={`/${locale}/products`} className="mt-3 inline-block text-sm text-indigo-600 hover:underline">
                  Clear filters
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
