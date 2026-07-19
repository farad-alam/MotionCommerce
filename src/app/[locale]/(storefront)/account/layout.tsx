import { ReactNode } from "react";
import Link from "next/link";
import { User, ShoppingBag, MapPin, Heart, LogOut } from "lucide-react";

export default async function AccountLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const navItems = [
    { name: "My Profile", href: `/${locale}/account`, icon: User },
    { name: "Order History", href: `/${locale}/account/orders`, icon: ShoppingBag },
    { name: "Wishlist", href: `/${locale}/account/wishlist`, icon: Heart },
    { name: "Addresses", href: `/${locale}/account/addresses`, icon: MapPin },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                <item.icon className="w-5 h-5 text-slate-400" />
                {item.name}
              </Link>
            ))}
            
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4"
              >
                <LogOut className="w-5 h-5 text-red-400" />
                Sign Out
              </button>
            </form>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {children}
        </div>
        
      </div>
    </div>
  );
}
