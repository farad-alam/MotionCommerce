import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const alignmentClass = 
    settings.alignment === "left" ? "items-start text-left" :
    settings.alignment === "right" ? "items-end text-right" :
    "items-center text-center mx-auto";

  const variant = settings.variant || "default";

  if (variant === "split") {
    return (
      <div className="relative w-full overflow-hidden bg-slate-900 min-h-[60vh] flex flex-col md:flex-row items-center">
        <div className={`relative z-10 w-full md:w-1/2 p-8 md:p-16 flex flex-col ${alignmentClass}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            {settings.title}
          </h1>
          {settings.subtitle && (
            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-xl">
              {settings.subtitle}
            </p>
          )}
          {settings.buttonText && (
            <Link
              href={`/${locale}${settings.buttonLink || '/products'}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-indigo-500/25"
            >
              {settings.buttonText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
        <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] relative">
          {settings.backgroundImage ? (
            <img 
              src={settings.backgroundImage} 
              alt="Hero background" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-800" />
          )}
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="relative w-full bg-white dark:bg-slate-950 py-24 sm:py-32 flex flex-col items-center">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 w-full flex flex-col ${alignmentClass}`}>
          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 max-w-3xl leading-tight">
            {settings.title}
          </h1>
          {settings.subtitle && (
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl font-light">
              {settings.subtitle}
            </p>
          )}
          {settings.buttonText && (
            <Link
              href={`/${locale}${settings.buttonLink || '/products'}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-full transition-colors text-lg"
            >
              {settings.buttonText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Default Variant
  return (
    <div className="relative w-full overflow-hidden bg-slate-900 min-h-[60vh] flex items-center">
      {settings.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.backgroundImage} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      )}
      
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col ${alignmentClass}`}>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-3xl">
          {settings.title}
        </h1>
        {settings.subtitle && (
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl">
            {settings.subtitle}
          </p>
        )}
        {settings.buttonText && (
          <Link
            href={`/${locale}${settings.buttonLink || '/products'}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-indigo-500/25"
          >
            {settings.buttonText}
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
