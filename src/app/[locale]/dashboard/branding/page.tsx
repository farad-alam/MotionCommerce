"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Save, Loader2 } from "lucide-react";

export default function DashboardBrandingPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    logoUrl: "",
    faviconUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
  });

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/config/theme");
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
      await fetch("/api/config/theme", {
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
        <ImageIcon className="w-7 h-7 text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Branding</h1>
          <p className="text-sm text-slate-500">Manage store logos and social links</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="font-semibold text-slate-900 text-base">Visual Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Logo URL</label>
              <input type="text" value={formData.logoUrl || ""} onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500" />
              {formData.logoUrl && (
                <div className="mt-3 p-4 bg-slate-100 rounded-lg border border-slate-200 flex justify-center">
                  <img src={formData.logoUrl} alt="Logo preview" className="max-h-12 object-contain" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Favicon URL</label>
              <input type="text" value={formData.faviconUrl || ""} onChange={e => setFormData({ ...formData, faviconUrl: e.target.value })}
                placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500" />
              {formData.faviconUrl && (
                <div className="mt-3 p-4 bg-slate-100 rounded-lg border border-slate-200 flex justify-center">
                  <img src={formData.faviconUrl} alt="Favicon preview" className="max-h-12 object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="font-semibold text-slate-900 text-base">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: "Facebook URL", key: "facebookUrl", placeholder: "https://facebook.com/..." },
              { label: "Instagram URL", key: "instagramUrl", placeholder: "https://instagram.com/..." },
              { label: "Twitter / X URL", key: "twitterUrl", placeholder: "https://twitter.com/..." },
              { label: "YouTube URL", key: "youtubeUrl", placeholder: "https://youtube.com/..." },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                <input type="text" value={(formData as any)[key] || ""} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                  placeholder={placeholder} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {success ? "Saved!" : "Save Branding"}
          </button>
        </div>
      </form>
    </div>
  );
}
