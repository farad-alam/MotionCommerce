import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/providers/cart-provider";
import { Toaster } from "sonner";
import { configService } from "@/server/services/config.service";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MotionCommerce",
  description: "E-commerce platform by MotionBite",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Load SEO config to get GA ID — gracefully fallback if not set
  let gaId: string | null = null;
  try {
    const seoConfig = await configService.getSeoConfig();
    gaId = seoConfig?.googleAnalyticsId ?? null;
  } catch {}

  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        {/* Google Analytics — only injected when a GA ID is configured */}
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', { page_path: window.location.pathname });
                `.trim(),
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Toaster position="bottom-right" richColors theme="light" />
        </CartProvider>
      </body>
    </html>
  );
}
