"use client";

export function LogoCarouselSection({ settings }: { settings: any }) {
  const title = settings.title || "Featured In";
  const variant = settings.variant || "default";
  
  const logos = settings.logos || [
    { name: "Vogue", src: "" },
    { name: "GQ", src: "" },
    { name: "Hypebeast", src: "" },
    { name: "Elle", src: "" },
    { name: "Harper's Bazaar", src: "" },
  ];

  if (variant === "grid") {
    return (
      <section className="w-full py-16 sm:py-24 bg-background border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground uppercase tracking-widest">{title}</h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {logos.map((logo: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-center h-16 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                {logo.src ? (
                  <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-xl font-black text-muted-foreground tracking-tight font-serif italic">{logo.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Duplicate logos for seamless infinite scroll
  const allLogos = [...logos, ...logos, ...logos];

  return (
    <section className="w-full py-12 bg-background border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <p className="text-xs font-bold text-muted-foreground tracking-[0.2em] uppercase">
          {title}
        </p>
      </div>

      <div className="relative">
        <div
          className="flex items-center gap-16 animate-[scroll_30s_linear_infinite] px-4"
          style={{ width: `${allLogos.length * 200}px` }}
        >
          {allLogos.map((logo: any, i: number) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center w-40 h-12 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            >
              {logo.src ? (
                <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-xl font-black text-muted-foreground tracking-tight font-serif italic">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
