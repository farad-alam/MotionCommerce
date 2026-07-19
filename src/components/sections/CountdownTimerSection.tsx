"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(endDate: string) {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

export function CountdownTimerSection({ settings }: { settings: any }) {
  const endDate = settings.endDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft.expired && !settings.showExpired) return null;

  const variant = settings.variant || "default";

  if (variant === "inline") {
    return (
      <section className="w-full py-4 bg-primary text-primary-foreground border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 opacity-80" />
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-widest">{settings.title}</h2>
          </div>

          {!timeLeft.expired && (
            <div className="flex items-center gap-2 font-mono text-xl font-bold bg-background/20 px-4 py-1.5 rounded-[var(--theme-radius)]">
              <span>{pad(timeLeft.days)}</span>
              <span className="opacity-50">:</span>
              <span>{pad(timeLeft.hours)}</span>
              <span className="opacity-50">:</span>
              <span>{pad(timeLeft.minutes)}</span>
              <span className="opacity-50">:</span>
              <span>{pad(timeLeft.seconds)}</span>
            </div>
          )}

          {settings.buttonText && settings.buttonLink && (
            <Link
              href={settings.buttonLink}
              className="text-sm font-bold underline underline-offset-4 hover:text-white/80 transition-colors uppercase tracking-widest"
            >
              {settings.buttonText}
            </Link>
          )}
        </div>
      </section>
    );
  }

  // Default Variant
  const bgColor = settings.bgColor || "var(--theme-foreground)";

  return (
    <section
      style={{ backgroundColor: bgColor }}
      className="w-full py-16 text-background"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {settings.title && (
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">{settings.title}</h2>
        )}
        {settings.subtitle && (
          <p className="text-background/80 mb-10 text-lg">{settings.subtitle}</p>
        )}

        {timeLeft.expired ? (
          <p className="text-2xl font-semibold text-rose-400">This offer has expired.</p>
        ) : (
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map(({ label, value }, i) => (
              <div key={label} className="flex items-center gap-2 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-background text-foreground rounded-[var(--theme-radius)] w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-3xl sm:text-4xl font-black tabular-nums shadow-lg">
                    {pad(value)}
                  </div>
                  <span className="text-[10px] sm:text-xs text-background/60 mt-3 font-bold tracking-[0.2em] uppercase">{label}</span>
                </div>
                {i < 3 && <span className="text-3xl font-black text-background/40 mb-7">:</span>}
              </div>
            ))}
          </div>
        )}

        {settings.buttonText && settings.buttonLink && (
          <div className="mt-12">
            <Link
              href={settings.buttonLink}
              className="inline-block px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full transition-colors text-lg uppercase tracking-wider shadow-xl"
            >
              {settings.buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
