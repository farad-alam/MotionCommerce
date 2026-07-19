import Link from "next/link";
import { getSiteConfig, getCategories } from "@/lib/storefront-data";
import { ExternalLink } from "lucide-react";

export async function StorefrontFooter({ locale }: { locale: string }) {
  const [siteConfig, categories] = await Promise.all([getSiteConfig(), getCategories()]);

  const socialLinks = (siteConfig?.socialLinks as Record<string, string> | null) || {};
  const storeName = siteConfig?.siteName || "MotionCommerce";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <p className="text-xl font-bold text-white">{storeName}</p>
            {siteConfig?.tagline && (
              <p className="mt-1 text-sm text-slate-400">{siteConfig.tagline}</p>
            )}
            {siteConfig?.contactEmail && (
              <p className="mt-4 text-sm">
                <span className="text-slate-500">Email: </span>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white transition-colors">
                  {siteConfig.contactEmail}
                </a>
              </p>
            )}
            {siteConfig?.contactPhone && (
              <p className="mt-1 text-sm">
                <span className="text-slate-500">Phone: </span>
                <a href={`tel:${siteConfig.contactPhone}`} className="hover:text-white transition-colors">
                  {siteConfig.contactPhone}
                </a>
              </p>
            )}
            {/* Social Icons */}
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                {Object.entries(socialLinks).map(([key, url]) => {
                  if (!url) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm capitalize"
                      aria-label={key}
                    >
                      {key} <ExternalLink className="w-3 h-3" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Categories */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</p>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/products`} className="text-sm text-slate-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              {categories.slice(0, 6).map((cat: any) => (
                <li key={cat.id}>
                  <Link
                    href={`/${locale}/products?category=${cat.slug}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Information</p>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: `/${locale}/about` },
                { label: "Contact", href: `/${locale}/contact` },
                { label: "Privacy Policy", href: `/${locale}/privacy` },
                { label: "Terms & Conditions", href: `/${locale}/terms` },
                { label: "Return Policy", href: `/${locale}/returns` },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {currentYear} {storeName}. All rights reserved.</p>
          {/* MotionBite credit — controlled by FooterConfig.showMotionBiteCredit in DB */}
          <p>
            Design &amp; Developed by{" "}
            <a
              href="https://motionbite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              MotionBite
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
