import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ImageWithTextSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const imagePosition = settings.imagePosition || "left";
  const isImageLeft = imagePosition === "left";
  const variant = settings.variant || "default";

  if (variant === "full-bleed") {
    return (
      <section className="w-full bg-background overflow-hidden border-y border-border">
        <div className={`flex flex-col ${isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
          {/* Image */}
          <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto">
            {settings.image ? (
              <img
                src={settings.image}
                alt={settings.imageAlt || settings.title || ""}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-secondary text-muted-foreground text-sm">
                Image placeholder
              </div>
            )}
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 lg:p-24 bg-card">
            <div className="max-w-lg w-full flex flex-col gap-6">
              {settings.eyebrow && (
                <span className="text-sm font-bold text-primary tracking-[0.2em] uppercase">
                  {settings.eyebrow}
                </span>
              )}
              <h2 className="text-4xl sm:text-5xl font-serif text-foreground leading-[1.1]">
                {settings.title || "Our Story"}
              </h2>
              {settings.text && (
                <p className="text-muted-foreground leading-relaxed text-lg font-light">
                  {settings.text}
                </p>
              )}
              {settings.buttonText && (
                <div className="mt-4">
                  <Link
                    href={`/${locale}${settings.buttonLink || "/products"}`}
                    className="inline-flex items-center gap-2 border-b border-primary text-primary font-semibold pb-1 hover:pr-2 transition-all"
                  >
                    {settings.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "overlapping") {
    return (
      <section className="w-full py-16 sm:py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`flex flex-col ${isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center relative`}>
            {/* Image */}
            <div className="w-full lg:w-3/5 relative z-0">
              <div className="aspect-[4/5] sm:aspect-video lg:aspect-[4/3] rounded-[var(--theme-radius)] overflow-hidden shadow-2xl">
                {settings.image ? (
                  <img
                    src={settings.image}
                    alt={settings.imageAlt || settings.title || ""}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-background text-muted-foreground">
                    Image placeholder
                  </div>
                )}
              </div>
            </div>

            {/* Content (Overlapping) */}
            <div className={`w-full lg:w-2/5 relative z-10 -mt-16 lg:mt-0 ${isImageLeft ? "lg:-ml-24" : "lg:-mr-24"}`}>
              <div className="bg-background p-8 sm:p-12 shadow-xl rounded-[var(--theme-radius)] border border-border flex flex-col gap-5">
                {settings.eyebrow && (
                  <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                    {settings.eyebrow}
                  </span>
                )}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
                  {settings.title || "Our Story"}
                </h2>
                {settings.text && (
                  <p className="text-muted-foreground leading-relaxed">
                    {settings.text}
                  </p>
                )}
                {settings.buttonText && (
                  <div className="mt-2">
                    <Link
                      href={`/${locale}${settings.buttonLink || "/products"}`}
                      className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-[var(--theme-radius)] hover:bg-primary/90 transition-colors"
                    >
                      {settings.buttonText}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default Variant
  return (
    <section className="w-full py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex flex-col ${isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-center`}>
          {/* Image */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="rounded-[var(--theme-radius)] overflow-hidden aspect-[4/3] bg-secondary">
              {settings.image ? (
                <img
                  src={settings.image}
                  alt={settings.imageAlt || settings.title || ""}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  Image placeholder
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-6">
            {settings.eyebrow && (
              <span className="text-sm font-semibold text-primary tracking-widest uppercase">
                {settings.eyebrow}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {settings.title || "Our Story"}
            </h2>
            {settings.text && (
              <p className="text-muted-foreground leading-relaxed text-lg">
                {settings.text}
              </p>
            )}
            {settings.buttonText && (
              <div className="mt-2">
                <Link
                  href={`/${locale}${settings.buttonLink || "/products"}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all"
                >
                  {settings.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
