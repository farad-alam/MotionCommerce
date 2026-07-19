"use client";

import { useEffect, useState } from "react";

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

  const bgColor = settings.bgColor || "#0f172a";

  return (
    <section
      style={{ backgroundColor: bgColor }}
      className="w-full py-12 text-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {settings.title && (
          <h2 className="text-3xl font-bold mb-2">{settings.title}</h2>
        )}
        {settings.subtitle && (
          <p className="text-slate-300 mb-8">{settings.subtitle}</p>
        )}

        {timeLeft.expired ? (
          <p className="text-2xl font-semibold text-rose-400">This offer has expired.</p>
        ) : (
          <div className="flex items-center justify-center gap-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map(({ label, value }, i) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 rounded-2xl w-20 h-20 flex items-center justify-center text-4xl font-black tabular-nums backdrop-blur-sm border border-white/10">
                    {pad(value)}
                  </div>
                  <span className="text-xs text-slate-400 mt-2 font-medium tracking-widest uppercase">{label}</span>
                </div>
                {i < 3 && <span className="text-3xl font-black text-white/40 mb-5">:</span>}
              </div>
            ))}
          </div>
        )}

        {settings.buttonText && settings.buttonLink && (
          <div className="mt-10">
            <a
              href={settings.buttonLink}
              className="inline-block px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-full transition-colors text-lg"
            >
              {settings.buttonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
