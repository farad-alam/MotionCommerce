"use client";

import { useState, useEffect } from "react";
import { Ticket, Plus, Trash2, Loader2, Save } from "lucide-react";
import { format } from "date-fns";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    type: "PERCENTAGE",
    value: "",
    minOrderAmount: "",
    maxUses: "",
    expiresAt: "",
    isActive: true,
  });

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/coupons");
      const json = await res.json();
      setCoupons(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          value: parseFloat(formData.value),
          minOrderAmount: formData.minOrderAmount ? parseFloat(formData.minOrderAmount) : null,
          maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
          expiresAt: formData.expiresAt || null,
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ code: "", type: "PERCENTAGE", value: "", minOrderAmount: "", maxUses: "", expiresAt: "", isActive: true });
        fetchCoupons();
      }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Ticket className="w-7 h-7 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Coupons</h1>
            <p className="text-sm text-slate-500">Create and manage discount codes</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> New Coupon
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">Create Coupon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Code *</label>
              <input required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-mono uppercase text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="SAVE20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500">
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount (৳)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Value *</label>
              <input required type="number" min="0" step="0.01" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500"
                placeholder="10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Min Order Amount</label>
              <input type="number" min="0" value={formData.minOrderAmount} onChange={e => setFormData({...formData, minOrderAmount: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500"
                placeholder="Optional" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Max Uses</label>
              <input type="number" min="1" value={formData.maxUses} onChange={e => setFormData({...formData, maxUses: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500"
                placeholder="Unlimited" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Expires At</label>
              <input type="date" value={formData.expiresAt} onChange={e => setFormData({...formData, expiresAt: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium">Cancel</button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-medium transition-colors">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Coupon
            </button>
          </div>
        </form>
      )}

      {/* Coupons Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Type / Value</th>
              <th className="px-6 py-4">Uses</th>
              <th className="px-6 py-4">Expires</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {coupons.map((c: any) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-semibold text-indigo-600">{c.code}</td>
                <td className="px-6 py-4 text-slate-700">
                  {c.type === "PERCENTAGE" ? `${c.value}%` : `৳${c.value}`} off
                  {c.minOrderAmount && <span className="text-xs text-slate-400 ml-2">min ৳{c.minOrderAmount}</span>}
                </td>
                <td className="px-6 py-4 text-slate-600">{c.usedCount ?? 0} / {c.maxUses ?? "∞"}</td>
                <td className="px-6 py-4 text-slate-500">{c.expiresAt ? format(new Date(c.expiresAt), "MMM d, yyyy") : "Never"}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${c.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No coupons created yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
