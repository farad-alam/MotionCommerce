"use client";

import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "bn", label: "বাং" },
];

export function LanguageToggler({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    // Replace /en/... with /bn/... (or vice versa)
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 border border-slate-200 rounded-md px-1 py-0.5">
      <Globe className="w-3.5 h-3.5 text-slate-400" />
      {LOCALES.map((loc: any) => (
        <button
          key={loc.code}
          onClick={() => switchLocale(loc.code)}
          className={`text-xs px-1.5 py-0.5 rounded transition-colors ${
            locale === loc.code
              ? "bg-indigo-600 text-white"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
