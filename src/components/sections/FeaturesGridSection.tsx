import { Zap, Shield, Globe, Heart, Star, Truck, Headphones, Gift, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  shield: Shield,
  globe: Globe,
  heart: Heart,
  star: Star,
  truck: Truck,
  headphones: Headphones,
  gift: Gift,
};

export function FeaturesGridSection({ settings }: { settings: any }) {
  const title = settings.title || "The Motion Commerce Difference";
  const subtitle = settings.subtitle || "";
  const columns = settings.columns || 3;
  const variant = settings.variant || "default";

  const features = settings.features || [
    { icon: "zap", title: "Express Delivery", description: "Get your order in 1-2 business days with our premium shipping." },
    { icon: "shield", title: "Premium Quality", description: "Ethically sourced materials designed to stand the test of time." },
    { icon: "globe", title: "Global Shipping", description: "We deliver to over 100 countries worldwide." },
    { icon: "heart", title: "Sustainable", description: "100% carbon neutral operations and recycled packaging." },
    { icon: "headphones", title: "Style Advice", description: "Connect with our expert stylists 24/7." },
    { icon: "gift", title: "Gift Ready", description: "Every order arrives in our signature luxury unboxing experience." },
  ];

  if (variant === "alternating") {
    return (
      <section className="w-full py-16 sm:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {(title || subtitle) && (
            <div className="text-center mb-16">
              {title && <h2 className="text-4xl sm:text-5xl font-black text-foreground uppercase tracking-tight mb-4">{title}</h2>}
              {subtitle && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
            </div>
          )}

          <div className="flex flex-col gap-12 sm:gap-20">
            {features.map((feature: any, i: number) => {
              const Icon = iconMap[feature.icon] || Zap;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`flex flex-col ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'} items-center gap-8 sm:gap-16 group`}
                >
                  <div className="w-full sm:w-1/2 flex justify-center sm:justify-end">
                    <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-xl border border-border">
                      <Icon className="w-12 h-12 sm:w-20 sm:h-20 text-foreground" />
                    </div>
                  </div>
                  <div className={`w-full sm:w-1/2 text-center sm:text-left`}>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">{feature.title}</h3>
                    {feature.description && (
                      <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Default Variant
  const colClass = columns === "2" ? "sm:grid-cols-2" : columns === "4" ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="w-full py-16 sm:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{title}</h2>}
            {subtitle && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <div className={`grid grid-cols-1 ${colClass} gap-8`}>
          {features.map((feature: any, i: number) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <div
                key={i}
                className="bg-card rounded-[var(--theme-radius)] p-8 border border-border flex flex-col gap-5 hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-[var(--theme-radius)] bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors">
                  <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
