import Link from "next/link";
import { getSiteConfig, getCategories } from "@/lib/storefront-data";
import { LanguageToggler } from "./LanguageToggler";
import { ShoppingCart, Search, Menu } from "lucide-react";

export async function StorefrontHeader({ locale }: { locale: string }) {
  const [siteConfig, categories] = await Promise.all([getSiteConfig(), getCategories()]);

  const storeName = siteConfig?.siteName || "MotionCommerce";
  const logo = siteConfig?.logo;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Store Name */}
          <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
            {logo ? (
              <img src={logo} alt={storeName} className="h-8 w-auto object-contain" />
            ) : (
              <span className="text-xl font-bold text-slate-900">{storeName}</span>
            )}
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href={`/${locale}`}
              className="px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              href={`/${locale}/products`}
              className="px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            >
              Products
            </Link>
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}/products?category=${cat.slug}`}
                className="px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LanguageToggler locale={locale} />
            <Link
              href={`/${locale}/products`}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/cart`}
              className="relative p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
