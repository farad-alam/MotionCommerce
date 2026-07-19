import { ReactNode } from "react";
import Link from "next/link";
import { getSiteConfig } from "@/lib/storefront-data";

export default async function AuthLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteConfig = await getSiteConfig();
  const storeName = siteConfig?.siteName || "MotionCommerce";
  const logo = siteConfig?.logo;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href={`/${locale}`} className="flex justify-center mb-6">
          {logo ? (
            <img src={logo} alt={storeName} className="h-12 w-auto object-contain" />
          ) : (
            <span className="text-3xl font-bold text-indigo-600 tracking-tight">{storeName}</span>
          )}
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/40 sm:rounded-2xl sm:px-10 border border-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
}
