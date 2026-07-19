import Link from "next/link";

export function PromoBannerSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const bgColor = settings.bgColor || "#dc2626";
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
        <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-transform shadow-lg text-lg"
          >
            {settings.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
