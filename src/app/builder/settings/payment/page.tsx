"use client";

import { useEffect, useState } from "react";
import { Save, CreditCard, Loader2 } from "lucide-react";

export default function PaymentSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    bkashNumber: "",
    bkashAccountType: "personal",
    nagadNumber: "",
    bankName: "",
    bankAccountName: "",
    bankAccountNo: "",
    bankBranch: "",
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/config/payment-info");
        const json = await res.json();
        if (json.data) {
          setFormData((prev) => ({ ...prev, ...json.data }));
        }
      } catch (err) {
        console.error("Failed to load payment info", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/config/payment-info", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save payment info");
      setSuccess(true);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="w-8 h-8 text-indigo-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Payment Configuration</h1>
          <p className="text-sm text-slate-400">Configure manual payment gateways (bKash, Nagad, Bank)</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* bKash Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            bKash Settings
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">bKash Number</label>
              <input
                type="text"
                name="bkashNumber"
                value={formData.bkashNumber || ""}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500"
                placeholder="01XXXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Account Type</label>
              <select
                name="bkashAccountType"
                value={formData.bkashAccountType || "personal"}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500"
              >
                <option value="personal">Personal (Send Money)</option>
                <option value="merchant">Merchant (Payment)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Nagad Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Nagad Settings</h2>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Nagad Number</label>
            <input
              type="text"
              name="nagadNumber"
              value={formData.nagadNumber || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500"
              placeholder="01XXXXXXXXX"
            />
          </div>
        </div>

        {/* Bank Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Bank Transfer Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName || ""}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Account Name</label>
              <input
                type="text"
                name="bankAccountName"
                value={formData.bankAccountName || ""}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Account Number</label>
              <input
                type="text"
                name="bankAccountNo"
                value={formData.bankAccountNo || ""}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Branch</label>
              <input
                type="text"
                name="bankBranch"
                value={formData.bankBranch || ""}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {error && <div className="text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded">{error}</div>}
        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {success ? "Saved!" : "Save Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
}
