import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PromoBannerSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const variant = settings.variant || "default";
  
  if (variant === "image-overlay") {
    return (
      <section className="relative w-full py-24 overflow-hidden border-y border-border">
        {settings.backgroundImage ? (
          <div className="absolute inset-0 z-0">
            <img 
              src={settings.backgroundImage} 
              alt="Promo background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-primary/90" />
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          {settings.badge && (
            <span className="inline-block px-4 py-1.5 bg-white text-slate-900 font-black tracking-widest uppercase text-sm mb-6 rounded-full">
              {settings.badge}
            </span>
          )}
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6 uppercase tracking-tight drop-shadow-md">
            {settings.title || "MEGA SALE"}
          </h2>
          {settings.subtitle && (
            <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto font-medium drop-shadow-sm">
              {settings.subtitle}
            </p>
          )}
          {settings.buttonText && (
            <Link
              href={`/${locale}${settings.buttonLink || "/products"}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-[var(--theme-radius)] hover:bg-slate-100 transition-colors shadow-lg text-lg"
            >
              {settings.buttonText} <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    );
  }

  if (variant === "gradient") {
    const bgColor = settings.bgColor || "var(--theme-primary)";
    const textColor = settings.textColor || "var(--theme-primary-foreground)";
    
    return (
      <section
        className="w-full py-16 sm:py-24 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${bgColor} 0%, rgba(255,255,255,0.1) 100%), ${bgColor}`,
          color: textColor
        }}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          {settings.badge && (
            <span 
              className="inline-block text-xs font-black tracking-[0.2em] uppercase py-2 px-4 rounded-full mb-6 border-2 border-current"
            >
              {settings.badge}
            </span>
          )}
          <h2 className="text-5xl sm:text-7xl font-black leading-[0.9] mb-6 uppercase tracking-tighter">
            {settings.title || "MEGA SALE"}
          </h2>
          {settings.subtitle && (
            <p className="text-xl sm:text-2xl opacity-90 mb-10 max-w-2xl mx-auto font-light">
              {settings.subtitle}
            </p>
          )}
          {settings.buttonText && (
            <Link
              href={`/${locale}${settings.buttonLink || "/products"}`}
              className="inline-flex items-center gap-2 px-10 py-4 bg-background text-foreground font-bold rounded-full hover:scale-105 transition-transform shadow-2xl text-lg uppercase tracking-wider"
            >
              {settings.buttonText}
            </Link>
          )}
        </div>
      </section>
    );
  }

  // Default Variant
  const bgColor = settings.bgColor || "#000000";
  const textColor = settings.textColor || "#ffffff";

  return (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className="w-full py-14"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {settings.badge && (
          <span className="inline-block text-xs font-bold tracking-widest uppercase py-1 px-3 rounded-full mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
            {settings.badge}
          </span>
        )}
        <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-4 uppercase">
          {settings.title || "MEGA SALE"}
        </h2>
        {settings.subtitle && (
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            {settings.subtitle}
          </p>
        )}
        {settings.buttonText && (
          <Link
            href={`/${locale}${settings.buttonLink || "/products"}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-[var(--theme-radius)] hover:scale-105 transition-transform shadow-lg text-lg"
          >
            {settings.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
