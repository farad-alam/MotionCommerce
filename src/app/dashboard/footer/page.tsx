"use client";

import { useState, useEffect } from "react";
import { Layers, Save, Loader2, Plus, Trash2, GripVertical } from "lucide-react";

export default function DashboardFooterPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sections, setSections] = useState<any[]>([]);
  const [bottomText, setBottomText] = useState("");

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/config/footer");
        const json = await res.json();
        if (json.data) {
          setSections(json.data.sections || []);
          setBottomText(json.data.bottomText || "");
        }
      } catch {}
      finally { setLoading(false); }
    };
    fetch_();
  }, []);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await fetch("/api/config/footer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections, bottomText }),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {} finally { setSaving(false); }
  };

  const addSection = () => {
    setSections([...sections, { id: `sec_${Date.now()}`, title: "New Section", links: [] }]);
  };

  const updateSectionTitle = (sIdx: number, title: string) => {
    const newSections = [...sections];
    newSections[sIdx].title = title;
    setSections(newSections);
  };

  const removeSection = (sIdx: number) => {
    const newSections = [...sections];
    newSections.splice(sIdx, 1);
    setSections(newSections);
  };

  const addLink = (sIdx: number) => {
    const newSections = [...sections];
    newSections[sIdx].links.push({ id: `link_${Date.now()}`, label: "", href: "" });
    setSections(newSections);
  };

  const updateLink = (sIdx: number, lIdx: number, key: string, value: string) => {
    const newSections = [...sections];
    newSections[sIdx].links[lIdx][key] = value;
    setSections(newSections);
  };

  const removeLink = (sIdx: number, lIdx: number) => {
    const newSections = [...sections];
    newSections[sIdx].links.splice(lIdx, 1);
    setSections(newSections);
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Layers className="w-7 h-7 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Footer Config</h1>
            <p className="text-sm text-slate-500">Manage footer link columns and copyright text</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={saving}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {success ? "Saved!" : "Save Footer"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section: any, sIdx: number) => (
          <div key={section.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <input type="text" value={section.title} onChange={e => updateSectionTitle(sIdx, e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 font-semibold text-slate-900 outline-none focus:border-indigo-500" />
              <button onClick={() => removeSection(sIdx)} className="text-slate-400 hover:text-red-500 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {section.links.map((link: any, lIdx: number) => (
                <div key={link.id} className="flex gap-2">
                  <input type="text" value={link.label} onChange={e => updateLink(sIdx, lIdx, 'label', e.target.value)}
                    placeholder="Label" className="w-1/2 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-indigo-500" />
                  <input type="text" value={link.href} onChange={e => updateLink(sIdx, lIdx, 'href', e.target.value)}
                    placeholder="/link" className="w-1/2 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-indigo-500" />
                  <button onClick={() => removeLink(sIdx, lIdx)} className="text-slate-400 hover:text-red-500 p-1.5">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={() => addLink(sIdx)} className="text-sm text-indigo-600 hover:text-indigo-500 font-medium flex items-center gap-1 pt-2">
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </div>
          </div>
        ))}
        
        <div className="flex items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl">
          <button onClick={addSection} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium">
            <Plus className="w-5 h-5" /> Add Column
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <label className="block text-sm font-medium text-slate-700 mb-1">Bottom Copyright Text</label>
        <input type="text" value={bottomText} onChange={e => setBottomText(e.target.value)}
          placeholder="© 2026 MotionCommerce. All rights reserved." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 outline-none focus:border-indigo-500" />
      </div>
    </div>
  );
}
