import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const alignmentClass = 
    settings.alignment === "left" ? "items-start text-left" :
    settings.alignment === "right" ? "items-end text-right" :
    "items-center text-center mx-auto";

  const variant = settings.variant || "default";

  // Shared button styles using theme colors and radius
  const primaryButtonClass = "inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all shadow-sm";
  const lightButtonClass = "inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-lg transition-all shadow-sm";

  if (variant === "cinematic") {
    return (
      <div className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-slate-950 flex items-end pb-16">
        {settings.backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={settings.backgroundImage} 
              alt="Hero background" 
              className="w-full h-full object-cover opacity-60"
            />
            {/* Gradient overlay for text readability at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-3xl">
            {settings.badge && (
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white text-sm font-medium tracking-widest uppercase mb-4 border border-white/20">
                {settings.badge}
              </span>
            )}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 leading-[0.9]">
              {settings.title}
            </h1>
            {settings.subtitle && (
              <p className="text-lg sm:text-2xl text-slate-300 font-light max-w-xl">
                {settings.subtitle}
              </p>
            )}
          </div>
          
          {settings.buttonText && (
            <Link
              href={`/${locale}${settings.buttonLink || '/products'}`}
              className={lightButtonClass}
            >
              {settings.buttonText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (variant === "lookbook") {
    return (
      <div className="relative w-full bg-slate-50 dark:bg-slate-950 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
            {/* Text Content */}
            <div className={`md:col-span-5 flex flex-col ${alignmentClass} md:items-start md:text-left mb-8 md:mb-0 order-2 md:order-1`}>
              {settings.badge && (
                <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4">
                  {settings.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white mb-6 leading-tight">
                {settings.title}
              </h1>
              {settings.subtitle && (
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md">
                  {settings.subtitle}
                </p>
              )}
              {settings.buttonText && (
                <Link
                  href={`/${locale}${settings.buttonLink || '/products'}`}
                  className={primaryButtonClass}
                >
                  {settings.buttonText}
                </Link>
              )}
            </div>
            
            {/* Image Mosaic */}
            <div className="md:col-span-7 grid grid-cols-2 gap-4 order-1 md:order-2">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
                {settings.backgroundImage && (
                  <img src={settings.backgroundImage} alt="Lookbook 1" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
                   {settings.backgroundImage && (
                    <img src={settings.backgroundImage} alt="Lookbook 2" className="w-full h-full object-cover object-top" />
                  )}
                </div>
                <div className="aspect-square rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center p-6 text-center">
                  <p className="font-serif text-xl italic text-slate-600 dark:text-slate-400">
                    "Style is a way to say who you are without having to speak."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "gradient") {
    const accent = settings.accentColor || "#ec4899"; // default pink
    return (
      <div 
        className="relative w-full min-h-[70vh] flex items-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--theme-primary) 0%, ${accent} 100%)`
        }}
      >
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[100px]" />
        
        <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full flex flex-col ${alignmentClass}`}>
          {settings.badge && (
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 border border-white/30 backdrop-blur-sm shadow-sm">
              {settings.badge}
            </span>
          )}
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-sm">
            {settings.title}
          </h1>
          {settings.subtitle && (
            <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl font-medium drop-shadow-sm">
              {settings.subtitle}
            </p>
          )}
          {settings.buttonText && (
            <Link
              href={`/${locale}${settings.buttonLink || '/products'}`}
              className={lightButtonClass}
            >
              {settings.buttonText}
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div className="relative w-full overflow-hidden bg-background min-h-[60vh] flex flex-col md:flex-row items-center border-b border-border">
        <div className={`relative z-10 w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col ${alignmentClass}`}>
          {settings.badge && (
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4">
              {settings.badge}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            {settings.title}
          </h1>
          {settings.subtitle && (
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl">
              {settings.subtitle}
            </p>
          )}
          {settings.buttonText && (
            <Link
              href={`/${locale}${settings.buttonLink || '/products'}`}
              className={primaryButtonClass}
            >
              {settings.buttonText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
        <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] relative">
          {settings.backgroundImage ? (
            <img 
              src={settings.backgroundImage} 
              alt="Hero background" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-secondary" />
          )}
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="relative w-full bg-background py-24 sm:py-32 flex flex-col items-center">
        <div className={`max-w-5xl mx-auto px-4 sm:px-6 w-full flex flex-col ${alignmentClass}`}>
          {settings.badge && (
            <span className="text-primary font-semibold tracking-widest text-sm uppercase mb-6">
              {settings.badge}
            </span>
          )}
          <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-black text-foreground tracking-tighter mb-8 leading-[0.95] uppercase">
            {settings.title}
          </h1>
          {settings.subtitle && (
            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl font-light">
              {settings.subtitle}
            </p>
          )}
          {settings.buttonText && (
            <Link
              href={`/${locale}${settings.buttonLink || '/products'}`}
              className={primaryButtonClass}
            >
              {settings.buttonText}
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Default Variant
  return (
    <div className="relative w-full overflow-hidden bg-slate-900 min-h-[70vh] flex items-center">
      {settings.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.backgroundImage} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      )}
      
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col ${alignmentClass}`}>
        {settings.badge && (
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded text-sm font-semibold tracking-wide uppercase mb-6">
            {settings.badge}
          </span>
        )}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
          {settings.title}
        </h1>
        {settings.subtitle && (
          <p className="text-lg sm:text-xl text-slate-200 mb-10 max-w-2xl font-medium">
            {settings.subtitle}
          </p>
        )}
        {settings.buttonText && (
          <Link
            href={`/${locale}${settings.buttonLink || '/products'}`}
            className={primaryButtonClass}
          >
            {settings.buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
