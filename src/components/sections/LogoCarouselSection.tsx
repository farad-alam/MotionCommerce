"use client";

export function LogoCarouselSection({ settings }: { settings: any }) {
  const title = settings.title || "Trusted By";
  const logos = settings.logos || [
    { name: "Brand One", src: "" },
    { name: "Brand Two", src: "" },
    { name: "Brand Three", src: "" },
    { name: "Brand Four", src: "" },
    { name: "Brand Five", src: "" },
    { name: "Brand Six", src: "" },
  ];

  // Duplicate logos for seamless infinite scroll
  const allLogos = [...logos, ...logos];

  return (
    <section className="w-full py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <p className="text-sm font-semibold text-slate-400 tracking-widest uppercase">
          {title}
        </p>
      </div>

      <div className="relative">
        <div
          className="flex items-center gap-12 animate-[scroll_25s_linear_infinite]"
          style={{ width: `${allLogos.length * 180}px` }}
        >
          {allLogos.map((logo: any, i: number) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center w-40 h-12 opacity-40 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
            >
              {logo.src ? (
                <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-lg font-black text-slate-400 tracking-tight">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
