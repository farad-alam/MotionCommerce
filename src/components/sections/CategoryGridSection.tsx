import { getCategories } from "@/lib/storefront-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function CategoryGridSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const allCategories = await getCategories();
  
  // Take top level categories up to limit
  const categories = allCategories
    .filter((c: any) => !c.parentId)
    .slice(0, settings.limit || 6);

  const variant = settings.variant || "default";

  if (variant === "boutique") {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-serif text-foreground">{settings.title}</h2>
          </div>
          <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat: any) => (
              <Link 
                key={cat.id} 
                href={`/${locale}/products?category=${cat.slug}`}
                className="group flex flex-col items-center flex-shrink-0 w-32 sm:w-40"
              >
                <div className="w-full aspect-square rounded-full overflow-hidden bg-secondary mb-4 border border-border group-hover:border-primary transition-colors">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl text-primary font-bold">{cat.name[0]}</span>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-foreground text-center group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "horizontal-scroll") {
    return (
      <section className="py-12 bg-background border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex-shrink-0">
              {settings.title}
            </h2>
            <div className="flex gap-3 flex-shrink-0">
              {categories.map((cat: any) => (
                <Link 
                  key={cat.id} 
                  href={`/${locale}/products?category=${cat.slug}`}
                  className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground font-medium text-sm transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "mosaic") {
    const featured = categories[0];
    const rest = categories.slice(1, 5); // take next 4
    return (
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-10 text-center uppercase">{settings.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[600px]">
            {/* Left large tile */}
            {featured && (
              <Link 
                href={`/${locale}/products?category=${featured.slug}`}
                className="group relative rounded-[var(--theme-radius)] overflow-hidden h-[300px] md:h-full block"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                {featured.image ? (
                  <img src={featured.image} alt={featured.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-primary group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-2 drop-shadow-md">
                    {featured.name}
                  </h3>
                  <span className="text-white font-semibold flex items-center gap-2 group-hover:gap-3 transition-all drop-shadow-md">
                    Shop Collection <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </Link>
            )}
            
            {/* Right grid of 4 smaller tiles */}
            <div className="grid grid-cols-2 gap-4 h-[600px] md:h-full">
              {rest.map((cat: any) => (
                <Link 
                  key={cat.id} 
                  href={`/${locale}/products?category=${cat.slug}`}
                  className="group relative rounded-[var(--theme-radius)] overflow-hidden block"
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10" />
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-secondary group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight drop-shadow-md">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "cards") {
    return (
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">{settings.title}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat: any) => (
              <Link 
                key={cat.id} 
                href={`/${locale}/products?category=${cat.slug}`}
                className="group bg-card border border-border rounded-[var(--theme-radius)] p-6 text-center hover:shadow-md hover:border-primary transition-all"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-2xl">📁</span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default Variant - Image Grid
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-foreground mb-10">{settings.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat: any) => (
            <Link 
              key={cat.id} 
              href={`/${locale}/products?category=${cat.slug}`}
              className="group relative h-64 rounded-[var(--theme-radius)] overflow-hidden block"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="absolute inset-0 bg-primary group-hover:scale-105 transition-transform duration-500" />
              )}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                  {cat.name}
                </h3>
                <span className="text-white/90 text-sm font-medium flex items-center gap-2 group-hover:text-white transition-colors">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
