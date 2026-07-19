"use client";

import { Link, usePathname } from "@/i18n/routing";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut,
  UserCircle,
  FileText,
  BookOpen,
  Image,
  Megaphone,
  Star,
  Layers,
  Ticket,
} from "lucide-react";
import { signOut } from "next-auth/react";

type NavGroup = {
  label: string;
  items: { name: string; href: string; icon: any }[];
};

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Commerce",
    items: [
      { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
      { name: "Products", href: "/dashboard/products", icon: Package },
      { name: "Categories", href: "/dashboard/categories", icon: Tags },
      { name: "Coupons", href: "/dashboard/coupons", icon: Ticket },
      { name: "Reviews", href: "/dashboard/reviews", icon: Star },
      { name: "Inventory", href: "/dashboard/inventory", icon: Layers },
    ],
  },
  {
    label: "Users",
    items: [
      { name: "Customers", href: "/dashboard/customers", icon: Users },
      { name: "Team / Users", href: "/dashboard/users", icon: UserCircle },
    ],
  },
  {
    label: "Content",
    items: [
      { name: "Blog", href: "/dashboard/blog", icon: BookOpen },
      { name: "Pages", href: "/dashboard/pages", icon: FileText },
      { name: "Media", href: "/dashboard/media", icon: Image },
    ],
  },
  {
    label: "Configuration",
    items: [
      { name: "Navigation", href: "/dashboard/navigation", icon: Megaphone },
      { name: "SEO", href: "/dashboard/seo", icon: LayoutDashboard },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-2">
        <div className="font-bold text-white text-lg">MotionBite</div>
        <span className="text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded font-medium">Admin</span>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
        {navGroups.map((group: any) => (
          <div key={group.label}>
            <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item: any) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive(item.href)
                      ? "bg-indigo-600 text-white font-medium"
                      : "hover:bg-slate-800 hover:text-white text-slate-400"
                  }`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-sm hover:bg-slate-800 hover:text-white text-slate-500 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
