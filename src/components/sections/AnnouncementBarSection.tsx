"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBarSection({ settings }: { settings: any }) {
  const variant = settings.variant || "default";

  if (variant === "multi-message") {
    const messages = settings.messages && settings.messages.length > 0 
      ? settings.messages 
      : [{ text: "Free shipping on all orders", linkText: "", linkUrl: "" }];
      
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (messages.length <= 1) return;
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
      }, 4000);
      return () => clearInterval(interval);
    }, [messages.length]);

    const currentMsg = messages[currentIndex];

    return (
      <div className="w-full py-2 bg-primary text-primary-foreground text-center text-xs sm:text-sm font-medium relative overflow-hidden h-9">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-full relative px-4">
          <div
            key={currentIndex}
            className="flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500 absolute w-full"
          >
            <span>{currentMsg.text}</span>
            {currentMsg.linkText && currentMsg.linkUrl && (
              <Link
                href={currentMsg.linkUrl}
                className="underline underline-offset-2 font-bold hover:text-white transition-colors"
              >
                {currentMsg.linkText}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "gradient") {
    const accent = settings.accentColor || "#ec4899";
    return (
      <div
        className="w-full py-2.5 px-4 text-center text-xs sm:text-sm font-bold relative overflow-hidden"
        style={{
          background: `linear-gradient(90deg, var(--theme-primary) 0%, ${accent} 50%, var(--theme-primary) 100%)`,
          backgroundSize: "200% auto",
          animation: "shimmer 5s linear infinite",
          color: settings.textColor || "#ffffff"
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 drop-shadow-sm">
          {settings.emoji && <span>{settings.emoji}</span>}
          <span className="uppercase tracking-widest">{settings.text}</span>
          {settings.linkText && settings.linkUrl && (
            <Link
              href={settings.linkUrl}
              className="flex items-center gap-1 border-b border-white/50 pb-0.5 hover:border-white transition-colors ml-2"
            >
              {settings.linkText} <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Default
  if (!settings.text) return null;
  const bgColor = settings.bgColor || "var(--theme-primary)";
  const textColor = settings.textColor || "var(--theme-primary-foreground)";

  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor }}
      className="w-full py-2.5 px-4 text-center text-xs sm:text-sm font-medium relative"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3">
        {settings.emoji && <span>{settings.emoji}</span>}
        <span>{settings.text}</span>
        {settings.linkText && settings.linkUrl && (
          <Link
            href={settings.linkUrl}
            className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity ml-2"
          >
            {settings.linkText}
          </Link>
        )}
      </div>
    </div>
  );
}
