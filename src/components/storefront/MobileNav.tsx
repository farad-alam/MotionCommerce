"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/providers/cart-provider";

export function MobileNav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const { count } = useCart();

  const links = [
    { name: "Home", href: `/${locale}`, icon: Home },
    { name: "Search", href: `/${locale}/products`, icon: Search },
    { name: "Cart", href: `/${locale}/cart`, icon: ShoppingBag, badge: count },
    { name: "Account", href: `/${locale}/account`, icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-2 pb-safe">
      <div className="flex items-center justify-around h-16">
        {links.map((link) => {
          const isActive = link.href === `/${locale}` ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative
                ${isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-900"}
              `}
            >
              <div className="relative">
                <link.icon className={`w-5 h-5 ${isActive ? "fill-indigo-50" : ""}`} />
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
