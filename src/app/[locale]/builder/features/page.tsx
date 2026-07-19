"use client";

import { useState, useEffect } from "react";
import {
  ToggleLeft, Save, Loader2, BookOpen, Star, Tag, Heart,
  MessageCircle, ArrowLeftRight, Ruler, Bell, ShoppingBag,
  DollarSign, Gift, CheckCircle2
} from "lucide-react";
import { invalidateFlagCache } from "@/lib/hooks/use-feature";
import type { FeatureFlagMap } from "@/lib/hooks/use-feature";
import { toast } from "sonner";

const DEFAULT_FLAGS: FeatureFlagMap = {
  blog: true,
  reviews: true,
  coupons: true,
  wishlist: true,
  whatsapp: false,
  whatsappNumber: "",
  whatsappMessageTemplate: "Hello! I want to order:\n{items}\n\nTotal: {total}",
  compareProducts: false,
  sizeGuide: false,
  stockAlerts: true,
  guestCheckout: true,
  multiCurrency: false,
  loyaltyPoints: false,
};

const CORE_FEATURES: { key: keyof FeatureFlagMap; label: string; desc: string; icon: any }[] = [
  { key: "blog",          label: "Blog System",         desc: "Enable /blog route and CMS",                      icon: BookOpen },
  { key: "reviews",       label: "Product Reviews",     desc: "Allow star ratings on products",                  icon: Star },
  { key: "coupons",       label: "Discount Coupons",    desc: "Enable promo codes at checkout",                  icon: Tag },
  { key: "wishlist",      label: "Wishlist",            desc: "Let customers save products for later",           icon: Heart },
  { key: "guestCheckout", label: "Guest Checkout",      desc: "Allow orders without account registration",       icon: ShoppingBag },
  { key: "stockAlerts",   label: "Stock Alerts",        desc: "Show low-stock & out-of-stock badges",            icon: Bell },
];

const ADVANCED_FEATURES: { key: keyof FeatureFlagMap; label: string; desc: string; icon: any; badge?: string }[] = [
  { key: "compareProducts", label: "Product Comparison", desc: "Side-by-side product comparison tool",         icon: ArrowLeftRight, badge: "Soon" },
  { key: "sizeGuide",       label: "Size Guide",         desc: "Show size chart on product pages",             icon: Ruler },
  { key: "multiCurrency",   label: "Multi-Currency",     desc: "Display prices in multiple currencies",        icon: DollarSign, badge: "Soon" },
  { key: "loyaltyPoints",   label: "Loyalty Points",     desc: "Reward customers with redeemable points",      icon: Gift, badge: "Soon" },
];

function ToggleRow({
  label, desc, icon: Icon, enabled, onToggle, disabled = false
}: {
  label: string; desc: string; icon: any; enabled: boolean;
  onToggle: () => void; disabled?: boolean;
}) {
  return (
    <div className={`flex items-start justify-between py-3.5 border-b border-slate-700 last:border-0 ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 p-1.5 rounded-md ${enabled ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-700 text-slate-500"}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="font-medium text-slate-200 text-sm">{label}</div>
          <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none mt-0.5
          ${enabled ? "bg-indigo-500" : "bg-slate-600"}`}
        role="switch" aria-checked={enabled}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

export default function BuilderFeaturesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [flags, setFlags] = useState<FeatureFlagMap>(DEFAULT_FLAGS);

  useEffect(() => {
    fetch("/api/config/features")
      .then(r => r.json())
      .then(json => {
        if (json?.data?.flags) {
          setFlags({ ...DEFAULT_FLAGS, ...(json.data.flags as FeatureFlagMap) });
        } else if (json?.data) {
          setFlags({ ...DEFAULT_FLAGS, ...(json.data as FeatureFlagMap) });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggle = (key: keyof FeatureFlagMap) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/config/features", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flags }),
      });
      if (!res.ok) throw new Error("Save failed");
      invalidateFlagCache();
      toast.success("Feature flags saved successfully!");
    } catch {
      toast.error("Failed to save feature flags. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ToggleLeft className="w-7 h-7 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Feature Flags</h1>
            <p className="text-sm text-slate-400">Toggle storefront modules on or off</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Modules */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-white text-base mb-1">Core Modules</h2>
          <p className="text-xs text-slate-400 mb-4">Essential storefront features</p>
          <div className="divide-y divide-slate-700/50">
            {CORE_FEATURES.map((f: { key: keyof FeatureFlagMap; label: string; desc: string; icon: any }) => (
              <ToggleRow
                key={f.key}
                label={f.label}
                desc={f.desc}
                icon={f.icon}
                enabled={Boolean(flags[f.key])}
                onToggle={() => toggle(f.key)}
              />
            ))}
          </div>
        </div>

        {/* Advanced / Upcoming */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-white text-base mb-1">Advanced Features</h2>
          <p className="text-xs text-slate-400 mb-4">Power features for growing stores</p>
          <div className="divide-y divide-slate-700/50">
            {ADVANCED_FEATURES.map((f: { key: keyof FeatureFlagMap; label: string; desc: string; icon: any; badge?: string }) => (
              <div key={f.key} className="flex items-start justify-between py-3.5 border-b border-slate-700 last:border-0">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1.5 rounded-md ${flags[f.key] ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-700 text-slate-500"}`}>
                    <f.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-200 text-sm">{f.label}</span>
                      {f.badge && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">{f.badge}</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{f.desc}</div>
                  </div>
                </div>
                <button
                  onClick={() => toggle(f.key)}
                  disabled={Boolean(f.badge)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none mt-0.5
                    ${flags[f.key] ? "bg-indigo-500" : "bg-slate-600"}
                    ${f.badge ? "opacity-40 cursor-not-allowed" : ""}`}
                  role="switch" aria-checked={Boolean(flags[f.key])}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${flags[f.key] ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Section */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${flags.whatsapp ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-500"}`}>
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-base">WhatsApp Ordering</h2>
              <p className="text-xs text-slate-400 mt-0.5">Allow customers to place orders via WhatsApp message</p>
            </div>
          </div>
          <button
            onClick={() => toggle("whatsapp")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${flags.whatsapp ? "bg-emerald-500" : "bg-slate-600"}`}
            role="switch" aria-checked={flags.whatsapp}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${flags.whatsapp ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <div className={`space-y-4 pt-4 border-t border-slate-700 transition-all ${!flags.whatsapp ? "opacity-40 pointer-events-none" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">WhatsApp Business Number</label>
              <input
                type="text"
                value={flags.whatsappNumber || ""}
                onChange={e => setFlags(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                placeholder="+8801700000000"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-indigo-500 text-sm"
              />
              <p className="text-[10px] text-slate-500 mt-1">Include country code. e.g. +880 for Bangladesh</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Message Template</label>
              <textarea
                rows={3}
                value={flags.whatsappMessageTemplate || ""}
                onChange={e => setFlags(prev => ({ ...prev, whatsappMessageTemplate: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-indigo-500 resize-none text-sm"
              />
              <p className="text-[10px] text-slate-500 mt-1">Variables: {"{items}"}, {"{total}"}, {"{name}"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Summary */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-400 mb-3">Currently Active Features</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(flags)
            .filter(([key, val]) => typeof val === "boolean" && val)
            .map(([key]) => (
              <span key={key} className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-indigo-500/15 text-indigo-400 rounded-full border border-indigo-500/20">
                <CheckCircle2 className="w-3 h-3" />
                {key}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
