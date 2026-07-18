import Link from "next/link";
import { getProducts, getCategories } from "@/lib/storefront-data";
import { ProductCard } from "@/components/storefront/ProductCard";
import { ProductSearch } from "@/components/storefront/ProductSearch";
import { SlidersHorizontal } from "lucide-react";

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}

export const metadata = {
  title: "All Products",
  description: "Browse our full collection of products.",
};

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = await params;
  const { category, search, page } = await searchParams;

  const currentPage = parseInt(page || "1", 10);
  const limit = 24;
  const skip = (currentPage - 1) * limit;

  const [categories, { products, total }] = await Promise.all([
    getCategories(),
    getProducts({ categoryId: category, search, limit, skip }),
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
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <SlidersHorizontal className="w-4 h-4" />
              Categories
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href={`/${locale}/products${search ? `?search=${search}` : ""}`}
                  className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${!category ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${locale}/products?category=${cat.slug}${search ? `&search=${search}` : ""}`}
                    className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${category === cat.slug ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {cat.name}
                  </Link>
                  {cat.children && cat.children.length > 0 && (
                    <ul className="ml-3 mt-1 space-y-1 border-l border-slate-200 pl-3">
                      {cat.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/${locale}/products?category=${child.slug}${search ? `&search=${search}` : ""}`}
                            className={`block text-xs px-2 py-1 rounded-md transition-colors ${category === child.slug ? "text-indigo-700 font-medium" : "text-slate-500 hover:text-slate-800"}`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
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
