"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2 } from "lucide-react";

export default function BuilderStorePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    currency: "BDT",
    currencySymbol: "৳",
    timezone: "Asia/Dhaka",
    supportEmail: "",
    supportPhone: "",
    orderPrefix: "MC-",
  });

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/config/store");
        const json = await res.json();
        if (json.data) setFormData((prev) => ({ ...prev, ...json.data }));
      } catch {}
      finally { setLoading(false); }
    };
    fetch_();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/config/store", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {} finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="w-7 h-7 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Store Configuration</h1>
            <p className="text-sm text-slate-400">Configure global store preferences</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={saving}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {success ? "Saved!" : "Save Settings"}
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm space-y-5">
        <h2 className="font-semibold text-white text-base">Localization</h2>
        <div className="grid grid-cols-2 gap-5">
          {[
            { label: "Currency Code", key: "currency", placeholder: "USD, BDT, EUR" },
            { label: "Currency Symbol", key: "currencySymbol", placeholder: "$, ৳, €" },
            { label: "Timezone", key: "timezone", placeholder: "UTC, Asia/Dhaka" },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-400 mb-1">{label}</label>
              <input type="text" value={(formData as any)[key] || ""} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                placeholder={placeholder} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm space-y-5">
        <h2 className="font-semibold text-white text-base">Store Details</h2>
        <div className="grid grid-cols-2 gap-5">
          {[
            { label: "Support Email", key: "supportEmail", placeholder: "support@mystore.com" },
            { label: "Support Phone", key: "supportPhone", placeholder: "+1 234 567 8900" },
            { label: "Order Number Prefix", key: "orderPrefix", placeholder: "ORD-" },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-400 mb-1">{label}</label>
              <input type="text" value={(formData as any)[key] || ""} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                placeholder={placeholder} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
