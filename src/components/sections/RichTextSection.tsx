export function RichTextSection({ settings }: { settings: any }) {
  const alignment = settings.alignment || "center";
  const alignClass = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center mx-auto";
  const maxWidth = settings.maxWidth || "3xl";

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`max-w-${maxWidth} ${alignClass}`}>
          {settings.eyebrow && (
            <span className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-4 block">
              {settings.eyebrow}
            </span>
          )}
          {settings.heading && (
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {settings.heading}
            </h2>
          )}
          {settings.body && (
            <div
              className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: settings.body.replace(/\n/g, "<br/>") }}
            />
          )}
          {settings.buttonText && settings.buttonLink && (
            <div className={`mt-8 ${alignment === "center" ? "flex justify-center" : ""}`}>
              <a
                href={settings.buttonLink}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
              >
                {settings.buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
