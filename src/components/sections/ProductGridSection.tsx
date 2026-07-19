import { getProducts } from "@/lib/storefront-data";
import { ProductCard } from "@/components/storefront/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function ProductGridSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const { products } = await getProducts({
    categoryId: settings.categoryId || undefined,
    limit: settings.limit || 8,
  });

  const variant = settings.variant || "default";

  const ViewAllLink = () => {
    if (!settings.showViewAll) return null;
    return (
      <Link 
        href={`/${locale}/products${settings.categoryId ? `?category=${settings.categoryId}` : ''}`}
        className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 transition-colors group"
      >
        View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    );
  };

  if (variant === "editorial") {
    // 1 large product, rest small.
    const featured = products[0];
    const rest = products.slice(1);
    
    return (
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-serif text-foreground">{settings.title}</h2>
          <div className="hidden sm:block"><ViewAllLink /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {featured && (
            <div className="md:col-span-8 lg:col-span-8">
              <ProductCard product={featured as any} locale={locale} />
            </div>
          )}
          <div className="md:col-span-4 lg:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-6">
            {rest.map((product: any) => (
              <ProductCard key={product.id} product={product as any} locale={locale} />
            ))}
          </div>
        </div>

        {settings.showViewAll && (
          <div className="mt-8 text-center sm:hidden flex justify-center">
            <ViewAllLink />
          </div>
        )}
      </section>
    );
  }

  if (variant === "spotlight") {
    // 1 spotlight product left, list of others right.
    const spotlight = products[0];
    const rest = products.slice(1, 4); // limit to 3 beside it

    return (
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-secondary rounded-[var(--theme-radius)] p-6 md:p-12">
          <div className="flex items-end justify-between mb-10">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold text-foreground uppercase tracking-tight">{settings.title}</h2>
              {settings.badgeText && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 uppercase rounded-md tracking-widest hidden sm:inline-block">
                  {settings.badgeText}
                </span>
              )}
            </div>
            <div className="hidden sm:block"><ViewAllLink /></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {spotlight && (
              <div className="w-full">
                <ProductCard product={spotlight as any} locale={locale} />
              </div>
            )}
            <div className="flex flex-col gap-6">
              {rest.map((product: any) => (
                <ProductCard key={product.id} product={product as any} locale={locale} />
              ))}
            </div>
          </div>
          
          {settings.showViewAll && (
            <div className="mt-8 text-center sm:hidden flex justify-center">
              <ViewAllLink />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "compact") {
    // Left side large, right side vertical list (no image or tiny image)
    const featured = products[0];
    const rest = products.slice(1, 6); // next 5
    
    return (
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">{settings.title}</h2>
          <div className="hidden sm:block"><ViewAllLink /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {featured && (
            <div>
              <ProductCard product={featured as any} locale={locale} />
            </div>
          )}
          <div className="flex flex-col gap-4">
            {rest.map((product: any) => {
               const price = Number(product.price);
               const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : null;
               
               return (
                 <Link href={`/${locale}/products/${product.slug}`} key={product.id} className="group flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors border border-border/50">
                    <div className="w-20 h-20 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                      {product.images[0] && (
                        <img src={product.images[0].url} alt={product.images[0].alt || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground truncate mb-1">
                        {product.categories[0]?.category.name || ""}
                      </p>
                      <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-foreground">৳{price.toLocaleString()}</span>
                        {compareAtPrice && (
                          <span className="text-xs text-muted-foreground line-through">৳{compareAtPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                 </Link>
               );
            })}
          </div>
        </div>

        {settings.showViewAll && (
          <div className="mt-8 text-center sm:hidden flex justify-center">
            <ViewAllLink />
          </div>
        )}
      </section>
    );
  }

  if (variant === "masonry") {
    // 2 columns mobile, 4 columns desktop, alternating slight margins to simulate masonry
    return (
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <h2 className="text-3xl font-black uppercase tracking-widest text-foreground">{settings.title}</h2>
          <div className="w-12 h-1 bg-primary mt-4 mb-6"></div>
          <div className="mt-2"><ViewAllLink /></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
          {products.map((product: any, idx: number) => (
            <div key={product.id} className={idx % 2 !== 0 ? 'mt-8' : ''}>
              <ProductCard product={product as any} locale={locale} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (variant === "carousel") {
    return (
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">{settings.title}</h2>
          <div className="hidden sm:block"><ViewAllLink /></div>
        </div>

        <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {products.map((product: any) => (
            <div key={product.id} className="min-w-[280px] max-w-[320px] flex-shrink-0 snap-start">
              <ProductCard product={product as any} locale={locale} />
            </div>
          ))}
        </div>
        
        {settings.showViewAll && (
          <div className="mt-4 text-center sm:hidden flex justify-center">
            <ViewAllLink />
          </div>
        )}
      </section>
    );
  }

  // Default Variant
  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-end justify-between mb-10">
        <h2 className="text-3xl font-bold text-foreground">{settings.title}</h2>
        <div className="hidden sm:block"><ViewAllLink /></div>
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium rounded-lg transition-colors"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
