"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsSection({ settings }: { settings: any }) {
  const title = settings.title || "Loved by our community";
  const subtitle = settings.subtitle || "Join thousands of satisfied customers.";
  const variant = settings.variant || "default";
  
  const testimonials = settings.testimonials || [
    { name: "Sarah K.", role: "Verified Buyer", rating: 5, quote: "The fit is absolutely perfect. I get compliments every time I wear this jacket!" },
    { name: "Mike R.", role: "Verified Buyer", rating: 5, quote: "Premium quality materials. You can really feel the difference compared to fast fashion." },
    { name: "Aisha T.", role: "Verified Buyer", rating: 5, quote: "Customer service was amazing when I needed to exchange sizes. Highly recommended." },
  ];

  if (variant === "carousel") {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    // Auto-advance
    useEffect(() => {
      const timer = setInterval(next, 5000);
      return () => clearInterval(timer);
    }, [testimonials.length]);

    const t = testimonials[currentIndex];

    return (
      <section className="w-full py-16 sm:py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <Quote className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-primary-foreground/10 mb-8" />
          
          <div className="min-h-[200px] flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500" key={currentIndex}>
            <div className="flex gap-1 justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= t.rating ? "fill-amber-400 text-amber-400" : "fill-primary-foreground/20 text-primary-foreground/20"}`}
                />
              ))}
            </div>
            
            <p className="text-2xl sm:text-4xl font-serif leading-tight mb-8">
              "{t.quote}"
            </p>
            
            <div>
              <p className="text-lg font-bold">{t.name}</p>
              {t.role && <p className="text-sm opacity-80 uppercase tracking-widest mt-1">{t.role}</p>}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <button onClick={prev} className="p-3 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_: any, i: number) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-primary-foreground w-6' : 'bg-primary-foreground/30'}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-3 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "masonry-wall") {
    // A simplified 3-column masonry approximation using CSS columns
    return (
      <section className="w-full py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-foreground uppercase tracking-tight mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t: any, i: number) => (
              <div
                key={i}
                className="bg-secondary/50 rounded-[var(--theme-radius)] p-8 border border-border break-inside-avoid"
              >
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= t.rating ? "fill-amber-400 text-amber-400" : "fill-border text-border"}`}
                    />
                  ))}
                </div>
                <p className="text-foreground text-lg leading-relaxed mb-6 font-medium">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>
                    {t.role && <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default Variant
  return (
    <section className="w-full py-16 bg-background border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">{title}</h2>
          {subtitle && <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t: any, i: number) => (
            <div
              key={i}
              className="bg-card rounded-[var(--theme-radius)] p-6 border border-border flex flex-col gap-4 hover:shadow-md hover:border-primary/50 transition-all"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= t.rating ? "fill-amber-400 text-amber-400" : "fill-border text-border"}`}
                  />
                ))}
              </div>

              <p className="text-foreground/80 text-sm leading-relaxed flex-1 italic">"{t.quote}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
