"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ConfigEditor({ initialSiteConfig, initialThemeConfig, initialFeatureFlags }: any) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [siteConfig, setSiteConfig] = useState(initialSiteConfig || {});
  const [themeConfig, setThemeConfig] = useState(initialThemeConfig || {});
  const [featureFlags, setFeatureFlags] = useState(initialFeatureFlags || {});

  const handleSaveSiteConfig = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/config/site", {
        method: "PATCH",
        body: JSON.stringify(siteConfig),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(await res.text());
      router.refresh();
    } catch (err: any) {
      alert("Failed to save: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveThemeConfig = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/config/theme", {
        method: "PATCH",
        body: JSON.stringify(themeConfig),
        headers: { "Content-Type": "application/json" },
      });
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveFeatureFlags = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/config/features", {
        method: "PATCH",
        body: JSON.stringify(featureFlags),
        headers: { "Content-Type": "application/json" },
      });
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Site Config Form */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Store Config</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Store Name</label>
            <input 
              type="text" 
              value={siteConfig.siteName || ""} 
              onChange={e => setSiteConfig({...siteConfig, siteName: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Contact Email</label>
            <input 
              type="email" 
              value={siteConfig.contactEmail || ""} 
              onChange={e => setSiteConfig({...siteConfig, contactEmail: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white"
            />
          </div>
          <button 
            onClick={handleSaveSiteConfig}
            disabled={isSaving}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md font-medium text-sm w-full"
          >
            {isSaving ? "Saving..." : "Save Store Config"}
          </button>
        </div>
      </div>



      {/* Feature Flags Form */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Feature Modules</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input 
              type="checkbox"
              checked={featureFlags.guestCheckout || false}
              onChange={e => setFeatureFlags({...featureFlags, guestCheckout: e.target.checked})}
              className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-600 bg-slate-900"
            />
            <span className="text-slate-300 text-sm">Guest Checkout</span>
          </label>
          <label className="flex items-center gap-3">
            <input 
              type="checkbox"
              checked={featureFlags.whatsappOrders || false}
              onChange={e => setFeatureFlags({...featureFlags, whatsappOrders: e.target.checked})}
              className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-600 bg-slate-900"
            />
            <span className="text-slate-300 text-sm">WhatsApp Orders (No DB)</span>
          </label>
          <label className="flex items-center gap-3">
            <input 
              type="checkbox"
              checked={featureFlags.blog || false}
              onChange={e => setFeatureFlags({...featureFlags, blog: e.target.checked})}
              className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-600 bg-slate-900"
            />
            <span className="text-slate-300 text-sm">Blog Module</span>
          </label>
          
          <button 
            onClick={handleSaveFeatureFlags}
            disabled={isSaving}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md font-medium text-sm w-full mt-4"
          >
            {isSaving ? "Saving..." : "Save Feature Flags"}
          </button>
        </div>
      </div>
    </div>
  );
}
