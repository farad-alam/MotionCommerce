"use client";

import { useState, useEffect } from "react";
import { Megaphone, Save, Loader2, Plus, Trash2, GripVertical } from "lucide-react";

export default function DashboardNavigationPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/config/navigation");
        const json = await res.json();
        if (json.data?.items) setItems(json.data.items);
      } catch {}
      finally { setLoading(false); }
    };
    fetch_();
  }, []);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await fetch("/api/config/navigation", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {} finally { setSaving(false); }
  };

  const addItem = () => {
    setItems([...items, { id: `nav_${Date.now()}`, label: "", href: "" }]);
  };

  const updateItem = (index: number, key: string, value: string) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const moveItem = (index: number, dir: 'up'|'down') => {
    if (dir === 'up' && index > 0) {
      const newItems = [...items];
      [newItems[index-1], newItems[index]] = [newItems[index], newItems[index-1]];
      setItems(newItems);
    } else if (dir === 'down' && index < items.length - 1) {
      const newItems = [...items];
      [newItems[index+1], newItems[index]] = [newItems[index], newItems[index+1]];
      setItems(newItems);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Megaphone className="w-7 h-7 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Navigation</h1>
            <p className="text-sm text-slate-500">Manage the main header menu links</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={saving}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {success ? "Saved!" : "Save Menu"}
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-lg group">
              <div className="flex flex-col gap-1 text-slate-400">
                <button type="button" onClick={() => moveItem(index, 'up')} disabled={index===0} className="hover:text-slate-700 disabled:opacity-30">▲</button>
                <button type="button" onClick={() => moveItem(index, 'down')} disabled={index===items.length-1} className="hover:text-slate-700 disabled:opacity-30">▼</button>
              </div>
              <GripVertical className="w-5 h-5 text-slate-400 cursor-grab" />
              
              <div className="flex-1 grid grid-cols-2 gap-3">
                <input type="text" value={item.label} onChange={e => updateItem(index, 'label', e.target.value)}
                  placeholder="Label (e.g. Shop)" className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-indigo-500" />
                <input type="text" value={item.href} onChange={e => updateItem(index, 'href', e.target.value)}
                  placeholder="Link (e.g. /products)" className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-indigo-500" />
              </div>
              
              <button type="button" onClick={() => removeItem(index)} className="text-slate-400 hover:text-red-500 p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          <button type="button" onClick={addItem} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
            <Plus className="w-4 h-4" /> Add Menu Item
          </button>
        </div>
      </div>
    </div>
  );
}
