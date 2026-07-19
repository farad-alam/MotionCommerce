import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function RichTextSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const alignment = settings.alignment || "center";
  const alignClass = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center mx-auto";
  const maxWidth = settings.maxWidth || "3xl";
  const variant = settings.variant || "default";

  if (variant === "two-column") {
    return (
      <section className="w-full py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              {settings.eyebrow && (
                <span className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-6 block">
                  {settings.eyebrow}
                </span>
              )}
              {settings.heading && (
                <h2 className="text-4xl sm:text-5xl font-serif text-foreground leading-[1.1]">
                  {settings.heading}
                </h2>
              )}
            </div>
            <div className="flex flex-col gap-8">
              {settings.body && (
                <div
                  className="prose prose-slate dark:prose-invert prose-lg max-w-none text-muted-foreground font-light leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: settings.body.replace(/\n/g, "<br/>") }}
                />
              )}
              {settings.buttonText && settings.buttonLink && (
                <div>
                  <Link
                    href={`/${locale}${settings.buttonLink}`}
                    className="inline-flex items-center gap-2 border-b-2 border-primary text-primary font-bold pb-1 hover:pr-2 transition-all uppercase tracking-widest text-sm"
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

  // Default Variant
  return (
    <section className="w-full py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`max-w-${maxWidth} ${alignClass}`}>
          {settings.eyebrow && (
            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-4 block">
              {settings.eyebrow}
            </span>
          )}
          {settings.heading && (
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
              {settings.heading}
            </h2>
          )}
          {settings.body && (
            <div
              className="prose prose-slate dark:prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed mx-auto"
              dangerouslySetInnerHTML={{ __html: settings.body.replace(/\n/g, "<br/>") }}
            />
          )}
          {settings.buttonText && settings.buttonLink && (
            <div className={`mt-10 ${alignment === "center" ? "flex justify-center" : ""}`}>
              <Link
                href={`/${locale}${settings.buttonLink}`}
                className="inline-flex items-center px-8 py-4 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-[var(--theme-radius)] transition-colors text-lg"
              >
                {settings.buttonText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
