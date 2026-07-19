import { getProducts } from "@/lib/storefront-data";
import { ProductCard } from "@/components/storefront/ProductCard";
import Link from "next/link";

export async function ProductGridSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const { products } = await getProducts({
    categoryId: settings.categoryId || undefined,
    limit: settings.limit || 8,
  });

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-end justify-between mb-10">
        <h2 className="text-3xl font-bold text-slate-900">{settings.title}</h2>
        {settings.showViewAll && (
          <Link 
            href={`/${locale}/products${settings.categoryId ? `?category=${settings.categoryId}` : ''}`}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm hidden sm:block"
          >
            View All &rarr;
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product as any} locale={locale} />
        ))}
      </div>

      {settings.showViewAll && (
        <div className="mt-8 text-center sm:hidden">
          <Link 
            href={`/${locale}/products${settings.categoryId ? `?category=${settings.categoryId}` : ''}`}
            className="inline-block px-6 py-3 bg-slate-100 text-slate-900 font-medium rounded-lg"
          >
            View All Products
          </Link>
        </div>
      )}
    </section>
  );
}
