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
  const title = settings.title || "Why Choose Us";
  const subtitle = settings.subtitle || "";
  const columns = settings.columns || 3;
  const features = settings.features || [
    { icon: "zap", title: "Lightning Fast", description: "Optimized for speed and performance across all devices." },
    { icon: "shield", title: "Secure & Trusted", description: "Bank-level security to protect your data and payments." },
    { icon: "globe", title: "Ships Worldwide", description: "We deliver to over 50 countries with tracking included." },
    { icon: "heart", title: "Made with Care", description: "Every product is crafted and quality-checked by hand." },
    { icon: "headphones", title: "24/7 Support", description: "Our team is always here to answer your questions." },
    { icon: "gift", title: "Gift Wrapping", description: "Free gift wrapping available on all orders." },
  ];

  const colClass = columns === 2 ? "sm:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="w-full py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl font-bold text-slate-900 mb-3">{title}</h2>}
            {subtitle && <p className="text-slate-500 max-w-xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <div className={`grid grid-cols-1 ${colClass} gap-6`}>
          {features.map((feature: any, i: number) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
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
