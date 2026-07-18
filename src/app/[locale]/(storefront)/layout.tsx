import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { configService } from "@/server/services/config.service";
import { StorefrontHeader } from "@/components/storefront/StorefrontHeader";
import { StorefrontFooter } from "@/components/storefront/StorefrontFooter";

export default async function StorefrontLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const messages = await getMessages();
  const themeConfig = await configService.getThemeConfig();

  const customStyle = themeConfig
    ? ({
        "--theme-primary": themeConfig.primaryColor || "#4f46e5",
        "--theme-secondary": themeConfig.secondaryColor || "#1e293b",
        "--theme-radius": themeConfig.borderRadius || "0.5rem",
        "--theme-font": themeConfig.fontFamily || "Inter",
      } as React.CSSProperties)
    : undefined;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="flex min-h-screen flex-col" style={customStyle}>
        <StorefrontHeader locale={locale} />
        <main className="flex-1">{children}</main>
        <StorefrontFooter locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
