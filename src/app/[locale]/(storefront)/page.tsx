import Link from "next/link";
import { getProducts, getCategories, getSiteConfig } from "@/lib/storefront-data";
import { ProductCard } from "@/components/storefront/ProductCard";
import { ArrowRight } from "lucide-react";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const [siteConfig, categories, { products: featuredProducts }] = await Promise.all([
    getSiteConfig(),
    getCategories(),
    getProducts({ isFeatured: true, limit: 8 }),
  ]);

  const storeName = siteConfig?.siteName || "MotionCommerce";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {storeName}
          </h1>
          {siteConfig?.tagline && (
            <p className="mt-4 text-lg sm:text-xl text-indigo-200 max-w-2xl mx-auto">
              {siteConfig.tagline}
            </p>
          )}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href={`/${locale}/products`}
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-6 py-3 rounded-xl shadow-lg transition-colors"
            >
              Shop Now
            </Link>
            {categories[0] && (
              <Link
                href={`/${locale}/products?category=${categories[0].slug}`}
                className="border border-white/30 hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Browse {categories[0].name}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-900">Shop by Category</h2>
            <Link href={`/${locale}/products`} className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}/products?category=${cat.slug}`}
                className="group flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all text-center"
              >
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded-full" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-xl">
                    🏷️
                  </div>
                )}
                <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-900">Featured Products</h2>
            <Link href={`/${locale}/products`} className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
