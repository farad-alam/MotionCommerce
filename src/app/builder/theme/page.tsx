"use client";

import { useState, useEffect } from "react";
import { Palette, Save, Loader2, Check } from "lucide-react";

const presets = [
  { name: "Default Indigo",   primary: "#4f46e5", secondary: "#1e293b", radius: "0.5rem",   font: "Inter" },
  { name: "Midnight Ocean",   primary: "#0ea5e9", secondary: "#0f172a", radius: "0.75rem",  font: "Inter" },
  { name: "Forest Minimal",   primary: "#10b981", secondary: "#18181b", radius: "0.25rem",  font: "Inter" },
  { name: "Sunset Orange",    primary: "#f97316", secondary: "#27272a", radius: "1rem",     font: "Inter" },
  { name: "Rose Boutique",    primary: "#f43f5e", secondary: "#1c1917", radius: "1.5rem",   font: "Playfair Display" },
  { name: "Golden Luxury",    primary: "#d97706", secondary: "#1c1917", radius: "0.25rem",  font: "Playfair Display" },
  { name: "Grape Royal",      primary: "#7c3aed", secondary: "#1e1b4b", radius: "0.75rem",  font: "Roboto" },
  { name: "Slate Corporate",  primary: "#334155", secondary: "#0f172a", radius: "0.25rem",  font: "Roboto" },
];

export default function BuilderThemePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    themePreset: "default",
    customStyles: {
      primaryColor: "#4f46e5",
      secondaryColor: "#1e293b",
      borderRadius: "0.5rem",
      fontFamily: "Inter",
    }
  });

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/config/theme");
        const json = await res.json();
        if (json.data) {
          setFormData({
            themePreset: json.data.themePreset || "default",
            customStyles: { ...formData.customStyles, ...(json.data.customStyles || {}) }
          });
        }
      } catch {}
      finally { setLoading(false); }
    };
    fetch_();
  }, []);

  const handleSubmit = async () => {
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

  const applyPreset = (preset: typeof presets[0]) => {
    setFormData({
      ...formData,
      themePreset: preset.name,
      customStyles: {
        ...formData.customStyles,
        primaryColor: preset.primary,
        secondaryColor: preset.secondary,
        borderRadius: preset.radius,
        fontFamily: preset.font,
      }
    });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Palette className="w-7 h-7 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Theme & Colors</h1>
            <p className="text-sm text-slate-400">Customize the look and feel of your storefront</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={saving}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {success ? "Saved!" : "Save Theme"}
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm space-y-6">
        <h2 className="font-semibold text-white text-base">Quick Presets</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {presets.map(p => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all
                ${formData.themePreset === p.name ? 'border-indigo-500 bg-slate-700' : 'border-slate-700 bg-slate-900 hover:border-slate-500'}`}
            >
              {formData.themePreset === p.name && (
                <div className="absolute top-2 right-2 text-indigo-400"><Check className="w-4 h-4" /></div>
              )}
              <div className="flex gap-2 mb-3">
                <div className="w-8 h-8 rounded-full shadow-inner border border-slate-600" style={{ backgroundColor: p.primary }} />
                <div className="w-8 h-8 rounded-full shadow-inner border border-slate-600" style={{ backgroundColor: p.secondary }} />
              </div>
              <span className="text-xs font-medium text-slate-300">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm space-y-6">
        <h2 className="font-semibold text-white text-base">Custom Variables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Primary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={formData.customStyles.primaryColor}
                onChange={e => setFormData({ ...formData, customStyles: { ...formData.customStyles, primaryColor: e.target.value } })}
                className="w-12 h-12 rounded cursor-pointer bg-slate-900 border-0 p-1" />
              <input type="text" value={formData.customStyles.primaryColor}
                onChange={e => setFormData({ ...formData, customStyles: { ...formData.customStyles, primaryColor: e.target.value } })}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 font-mono text-sm text-white outline-none focus:border-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Secondary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={formData.customStyles.secondaryColor}
                onChange={e => setFormData({ ...formData, customStyles: { ...formData.customStyles, secondaryColor: e.target.value } })}
                className="w-12 h-12 rounded cursor-pointer bg-slate-900 border-0 p-1" />
              <input type="text" value={formData.customStyles.secondaryColor}
                onChange={e => setFormData({ ...formData, customStyles: { ...formData.customStyles, secondaryColor: e.target.value } })}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 font-mono text-sm text-white outline-none focus:border-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Border Radius</label>
            <select value={formData.customStyles.borderRadius}
              onChange={e => setFormData({ ...formData, customStyles: { ...formData.customStyles, borderRadius: e.target.value } })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-indigo-500">
              <option value="0px">Square (0px)</option>
              <option value="0.25rem">Small (4px)</option>
              <option value="0.5rem">Medium (8px)</option>
              <option value="0.75rem">Large (12px)</option>
              <option value="1rem">Extra Large (16px)</option>
              <option value="9999px">Pill (Fully Rounded)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Font Family</label>
            <select value={formData.customStyles.fontFamily}
              onChange={e => setFormData({ ...formData, customStyles: { ...formData.customStyles, fontFamily: e.target.value } })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-indigo-500">
              <option value="Inter">Inter (Modern Sans)</option>
              <option value="Roboto">Roboto (Clean Sans)</option>
              <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
              <option value="system-ui">System Default</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
