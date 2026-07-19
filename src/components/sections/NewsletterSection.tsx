"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection({ settings }: { settings: any }) {
  const title = settings.title || "Stay in the loop";
  const subtitle = settings.subtitle || "Subscribe to get special offers, free giveaways, and exclusive deals.";
  const placeholder = settings.placeholder || "Enter your email address";
  const buttonText = settings.buttonText || "Subscribe";
  const incentive = settings.incentive || "Get 10% off your first order!";
  const bgColor = settings.bgColor || "indigo";

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
    toast.success("You're subscribed! Check your inbox.");
  };

  const bgClass = bgColor === "dark"
    ? "bg-slate-900 text-white"
    : bgColor === "light"
    ? "bg-slate-50 text-slate-900"
    : "bg-indigo-600 text-white";

  return (
    <section className={`w-full py-16 ${bgClass}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 mb-6">
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        {subtitle && <p className="opacity-80 mb-8">{subtitle}</p>}

        {done ? (
          <div className="bg-white/20 rounded-2xl p-6 font-semibold">
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
              className="flex-1 rounded-xl px-4 py-3 bg-white/10 border border-white/20 placeholder:opacity-60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 flex-shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
            </button>
          </form>
        )}

        {incentive && !done && (
          <p className="text-sm opacity-70 mt-4">{incentive}</p>
        )}
      </div>
    </section>
  );
}
