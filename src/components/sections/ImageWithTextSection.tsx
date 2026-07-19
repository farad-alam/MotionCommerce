import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ImageWithTextSection({ settings, locale = "en" }: { settings: any; locale?: string }) {
  const imagePosition = settings.imagePosition || "left";
  const isImageLeft = imagePosition === "left";

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex flex-col ${isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-center`}>
          {/* Image */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100">
              {settings.image ? (
                <img
                  src={settings.image}
                  alt={settings.imageAlt || settings.title || ""}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm">
                  Image placeholder
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-5">
            {settings.eyebrow && (
              <span className="text-sm font-semibold text-indigo-600 tracking-widest uppercase">
                {settings.eyebrow}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              {settings.title || "Our Story"}
            </h2>
            {settings.text && (
              <p className="text-slate-600 leading-relaxed text-lg">
                {settings.text}
              </p>
            )}
            {settings.buttonText && (
              <div>
                <Link
                  href={`/${locale}${settings.buttonLink || "/products"}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all"
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
