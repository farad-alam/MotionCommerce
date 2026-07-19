import { Star } from "lucide-react";

export function TestimonialsSection({ settings }: { settings: any }) {
  const title = settings.title || "What Our Customers Say";
  const subtitle = settings.subtitle || "";
  const testimonials = settings.testimonials || [
    { name: "Sarah K.", role: "Verified Buyer", rating: 5, quote: "Absolutely love the quality! Fast shipping and exactly as described. Will definitely order again." },
    { name: "Mike R.", role: "Verified Buyer", rating: 5, quote: "Great products at amazing prices. The packaging was perfect and customer service was very helpful." },
    { name: "Aisha T.", role: "Verified Buyer", rating: 5, quote: "I was skeptical at first but this exceeded my expectations. The quality is top notch!" },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{title}</h2>
          {subtitle && <p className="text-slate-500 max-w-xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t: any, i: number) => (
            <div
              key={i}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star: any) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= t.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 text-sm leading-relaxed flex-1">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  {t.role && <p className="text-xs text-slate-400">{t.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
