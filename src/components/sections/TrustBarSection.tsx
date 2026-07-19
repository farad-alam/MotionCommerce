import { Package, RotateCcw, ShieldCheck, Headphones, Truck, Star, Gift, Clock } from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  truck: Truck,
  "rotate-ccw": RotateCcw,
  "shield-check": ShieldCheck,
  headphones: Headphones,
  package: Package,
  star: Star,
  gift: Gift,
  clock: Clock,
};

export function TrustBarSection({ settings }: { settings: any }) {
  const variant = settings.variant || "default";
  const badges = settings.badges || [
    { icon: "truck", title: "Free Express Shipping", subtitle: "On orders over ৳5000" },
    { icon: "rotate-ccw", title: "Easy Returns", subtitle: "Within 30 days" },
    { icon: "shield-check", title: "Secure Payment", subtitle: "100% protected" },
    { icon: "headphones", title: "24/7 Support", subtitle: "Always here to help" },
  ];

  if (variant === "cards") {
    return (
      <div className="w-full bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge: any, i: number) => {
              const Icon = iconMap[badge.icon] || ShieldCheck;
              return (
                <div key={i} className="flex flex-col items-center text-center p-8 bg-card border border-border rounded-[var(--theme-radius)] hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{badge.title}</h3>
                  {badge.subtitle && <p className="text-sm text-muted-foreground">{badge.subtitle}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="w-full bg-background py-8 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {badges.map((badge: any, i: number) => {
              const Icon = iconMap[badge.icon] || ShieldCheck;
              return (
                <div key={i} className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground uppercase tracking-widest">{badge.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Default Variant
  return (
    <div className="w-full bg-secondary/50 border-y border-border/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`grid grid-cols-2 sm:grid-cols-${Math.min(badges.length, 4)} gap-6 lg:gap-10`}>
          {badges.map((badge: any, i: number) => {
            const Icon = iconMap[badge.icon] || ShieldCheck;
            return (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0 shadow-sm border border-border">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground uppercase tracking-wider">{badge.title}</p>
                  {badge.subtitle && <p className="text-xs text-muted-foreground mt-0.5">{badge.subtitle}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
