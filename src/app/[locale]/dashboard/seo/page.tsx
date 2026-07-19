"use client";

import { useState, useEffect } from "react";
import { Globe, Save, Loader2 } from "lucide-react";

export default function DashboardSeoPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    ogImage: "",
    googleAnalyticsId: "",
    googleSiteVerification: "",
    robotsDirective: "index, follow",
  });

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/config/seo");
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
      await fetch("/api/config/seo", {
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
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Globe className="w-7 h-7 text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">SEO Settings</h1>
          <p className="text-sm text-slate-500">Configure global search engine settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="font-semibold text-slate-900 text-base">Default Meta Tags</h2>
          {[
            { label: "Meta Title", key: "metaTitle", placeholder: "My Store — Best Products Online", type: "text" },
            { label: "Meta Description", key: "metaDescription", placeholder: "Discover amazing products at great prices...", type: "textarea" },
            { label: "OG Image URL", key: "ogImage", placeholder: "https://...", type: "text" },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
              {type === "textarea" ? (
                <textarea rows={3} value={(formData as any)[key] || ""} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                  placeholder={placeholder} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none" />
              ) : (
                <input type="text" value={(formData as any)[key] || ""} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                  placeholder={placeholder} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="font-semibold text-slate-900 text-base">Analytics & Verification</h2>
          {[
            { label: "Google Analytics ID", key: "googleAnalyticsId", placeholder: "G-XXXXXXXXXX" },
            { label: "Google Site Verification", key: "googleSiteVerification", placeholder: "verification_code_here" },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
              <input type="text" value={(formData as any)[key] || ""} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                placeholder={placeholder} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Robots Directive</label>
            <select value={formData.robotsDirective} onChange={e => setFormData({ ...formData, robotsDirective: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500">
              <option value="index, follow">index, follow (default)</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {success ? "Saved!" : "Save SEO Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
