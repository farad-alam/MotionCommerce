import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const ALLOWED_ROLES = ["SUPER_ADMIN", "AGENCY_STAFF", "CLIENT_ADMIN"];

export default async function BuilderLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const session = await auth();

  // Redirect unauthenticated users to login
  if (!session || !session.user) {
    redirect(`/${locale}/login?callbackUrl=/${locale}/builder`);
  }

  // Redirect users without the required role (Temporarily bypassed for development)
  const role = session.user.role as string;
  if (!ALLOWED_ROLES.includes(role)) {
    // redirect(`/${locale}?error=unauthorized`);
    console.warn(`[Auth Bypass] User with role ${role} accessed builder.`);
  }

  return (
    <div className="flex h-screen flex-col bg-slate-900 text-slate-50">
      <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
        <div className="flex items-center gap-2">
          <div className="font-bold text-indigo-400">MotionBite Builder</div>
          <div className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">v1.0.0</div>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-300">
          <Link href={`/${locale}/builder`} className="hover:text-white">Store Config</Link>
          <Link href={`/${locale}/builder/homepage`} className="hover:text-white">Homepage</Link>
          <Link href={`/${locale}/builder/theme`} className="hover:text-white">Theme</Link>
          <Link href={`/${locale}/builder/features`} className="hover:text-white">Features</Link>
          <Link href={`/${locale}/builder/branding`} className="hover:text-white">Branding</Link>
          <Link href={`/${locale}/builder/store`} className="hover:text-white">Store Setup</Link>
          <Link href={`/${locale}/builder/settings/payment`} className="hover:text-white">Payment Config</Link>
          <Link href={`/${locale}/builder/project`} className="hover:text-white">Project</Link>
          <div className="flex gap-4 border-l border-slate-700 pl-4">
            <Link href={`/${locale}/builder/orders`} className="hover:text-white">Orders</Link>
            <Link href={`/${locale}/builder/customers`} className="hover:text-white">Customers</Link>
          </div>
          <Link href={`/${locale}/dashboard`} className="text-indigo-400 hover:text-indigo-300 border-l border-slate-700 pl-4">Client Dashboard</Link>
        </nav>
      </header>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
