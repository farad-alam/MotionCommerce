"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";

export function NewsletterSection({ settings }: { settings: any }) {
  const title = settings.title || "Join The Club";
  const subtitle = settings.subtitle || "Subscribe to get early access to new drops, exclusive sales, and style guides.";
  const placeholder = settings.placeholder || "Enter your email address";
  const buttonText = settings.buttonText || "Subscribe";
  const incentive = settings.incentive || "Get 15% off your first order!";
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call – wire to real endpoint if needed
    await new Promise((r) => setTimeout(r, 800));
    setDone(true);
    setLoading(false);
  };

  const variant = settings.variant || "default";

  if (variant === "fullscreen") {
    return (
      <section className="relative w-full min-h-[60vh] flex flex-col justify-center py-20 overflow-hidden">
        {settings.backgroundImage ? (
          <div className="absolute inset-0 z-0">
            <img 
              src={settings.backgroundImage} 
              alt="Newsletter background" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-primary/90" />
        )}

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center w-full">
          <Mail className="w-12 h-12 text-white mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight uppercase">{title}</h2>
          {subtitle && <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-xl mx-auto font-light">{subtitle}</p>}

          {done ? (
            <div className="bg-white/10 backdrop-blur-md rounded-[var(--theme-radius)] p-6 font-semibold text-white border border-white/20">
              🎉 Welcome to the club! Thank you for joining us.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-[var(--theme-radius)] px-6 py-4 bg-white/10 border border-white/30 placeholder:text-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md text-lg text-center transition-all focus:bg-white/20"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-foreground font-black uppercase tracking-widest rounded-[var(--theme-radius)] hover:bg-slate-100 transition-colors disabled:opacity-50 text-lg shadow-xl"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : buttonText}
              </button>
            </form>
          )}

          {incentive && !done && (
            <p className="text-sm text-white/80 mt-6 font-medium tracking-wide uppercase">{incentive}</p>
          )}
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <section className="w-full py-16 sm:py-24 bg-background border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-3">{title}</h2>
              {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
            </div>

            <div className="w-full md:w-[400px]">
              {done ? (
                <div className="bg-secondary/50 text-secondary-foreground rounded-[var(--theme-radius)] p-5 font-medium text-center border border-border">
                  🎉 You're subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={placeholder}
                      className="flex-1 rounded-md px-4 py-3 bg-transparent border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center px-6 py-3 bg-foreground text-background font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 flex-shrink-0"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
                    </button>
                  </div>
                  {incentive && (
                    <p className="text-xs text-muted-foreground font-medium">{incentive}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default Variant
  const bgColor = settings.bgColor || "dark";
  const bgClass = bgColor === "dark"
    ? "bg-foreground text-background"
    : bgColor === "light"
    ? "bg-secondary text-secondary-foreground border-y border-border"
    : "bg-primary text-primary-foreground";

  const isLight = bgColor === "light";

  return (
    <section className={`w-full py-16 sm:py-24 ${bgClass}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-6 ${isLight ? 'bg-background' : 'bg-white/10'}`}>
          <Mail className={`w-6 h-6 ${isLight ? 'text-foreground' : 'text-current'}`} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">{title}</h2>
        {subtitle && <p className={`text-lg mb-8 ${isLight ? 'text-muted-foreground' : 'opacity-90'}`}>{subtitle}</p>}

        {done ? (
          <div className={`rounded-[var(--theme-radius)] p-6 font-semibold ${isLight ? 'bg-background border border-border' : 'bg-white/20'}`}>
            🎉 You're subscribed! Thank you for joining us.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className={`flex-1 rounded-[var(--theme-radius)] px-5 py-3.5 focus:outline-none focus:ring-2 transition-all ${
                isLight 
                  ? 'bg-background border border-border text-foreground focus:ring-primary/50' 
                  : 'bg-white/10 border border-white/20 placeholder:text-white/60 text-white focus:ring-white/50 backdrop-blur-sm focus:bg-white/20'
              }`}
            />
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center px-8 py-3.5 font-bold rounded-[var(--theme-radius)] transition-colors disabled:opacity-50 flex-shrink-0 ${
                isLight
                  ? 'bg-foreground text-background hover:bg-foreground/90'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : buttonText}
            </button>
          </form>
        )}

        {incentive && !done && (
          <p className={`text-sm mt-5 font-medium ${isLight ? 'text-muted-foreground' : 'opacity-80'}`}>{incentive}</p>
        )}
      </div>
    </section>
  );
}
