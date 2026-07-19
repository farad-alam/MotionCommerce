import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const alignmentClass = 
    settings.alignment === "left" ? "items-start text-left" :
    settings.alignment === "right" ? "items-end text-right" :
    "items-center text-center mx-auto";

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
