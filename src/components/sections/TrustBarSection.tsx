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
  const badges = settings.badges || [
    { icon: "truck", title: "Free Shipping", subtitle: "On orders over ৳999" },
    { icon: "rotate-ccw", title: "Easy Returns", subtitle: "Within 7 days" },
    { icon: "shield-check", title: "Secure Payment", subtitle: "100% protected" },
    { icon: "headphones", title: "24/7 Support", subtitle: "Always here to help" },
  ];

  return (
    <div className="w-full bg-slate-50 border-y border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`grid grid-cols-2 sm:grid-cols-${Math.min(badges.length, 4)} gap-6`}>
          {badges.map((badge: any, i: number) => {
            const Icon = iconMap[badge.icon] || ShieldCheck;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{badge.title}</p>
                  {badge.subtitle && <p className="text-xs text-slate-500">{badge.subtitle}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
