"use client";

import { useEffect, useState } from "react";
import { Save, Plus, Trash2, GripVertical, LayoutTemplate } from "lucide-react";
import { SectionSchemas, SectionType } from "@/config/sections/section-schemas";

export default function HomepageBuilder() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await fetch("/api/config/pages/homepage");
        const json = await res.json();
        if (json.data?.sections) {
          setSections(json.data.sections);
        } else {
          // Defaults if none exist
          setSections([
            { id: "s1", type: "hero", settings: SectionSchemas["hero"].defaultSettings },
            { id: "s2", type: "category-grid", settings: SectionSchemas["category-grid"].defaultSettings },
            { id: "s3", type: "product-grid", settings: SectionSchemas["product-grid"].defaultSettings }
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLayout();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/config/pages/homepage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Homepage",
          slug: "homepage",
          sections: sections
        })
      });
      alert("Homepage saved successfully!");
    } catch (err) {
      alert("Failed to save homepage");
    } finally {
      setSaving(false);
    }
  };

  const addSection = (type: SectionType) => {
    const newSection = {
      id: `sec_${Date.now()}`,
      type,
      settings: { ...SectionSchemas[type].defaultSettings }
    };
    setSections([...sections, newSection]);
  };

  const updateSectionSetting = (id: string, key: string, value: any) => {
    setSections(sections.map((sec: any) => {
      if (sec.id === id) {
        return { ...sec, settings: { ...sec.settings, [key]: value } };
      }
      return sec;
    }));
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newSections = [...sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      setSections(newSections);
    } else if (direction === 'down' && index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
      setSections(newSections);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading builder...</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <LayoutTemplate className="w-8 h-8 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Homepage Builder</h1>
            <p className="text-sm text-slate-400">Manage layout blocks and sections</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Layout"}
        </button>
      </div>

      <div className="flex gap-8 items-start">
        {/* Editor Area */}
        <div className="flex-1 space-y-4">
          {sections.map((section: any, index: number) => (
            <div key={section.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden group">
              <div className="bg-slate-900/50 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="text-slate-500 hover:text-white disabled:opacity-30">▲</button>
                    <button onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1} className="text-slate-500 hover:text-white disabled:opacity-30">▼</button>
                  </div>
                  <GripVertical className="w-4 h-4 text-slate-500" />
                  <span className="font-semibold text-white">
                    {SectionSchemas[section.type as SectionType]?.label || section.type}
                  </span>
                </div>
                <button 
                  onClick={() => removeSection(section.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {Object.keys(section.settings).map((key: any) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-slate-400 mb-1 capitalize">{key}</label>
                    {typeof section.settings[key] === 'boolean' ? (
                      <input 
                        type="checkbox"
                        checked={section.settings[key]}
                        onChange={(e) => updateSectionSetting(section.id, key, e.target.checked)}
                        className="rounded border-slate-700 text-indigo-600 bg-slate-900"
                      />
                    ) : (
                      <input 
                        type="text"
                        value={section.settings[key]}
                        onChange={(e) => updateSectionSetting(section.id, key, e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-indigo-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {sections.length === 0 && (
            <div className="text-center py-12 border border-dashed border-slate-700 rounded-xl text-slate-500">
              No sections added. Add one from the sidebar.
            </div>
          )}
        </div>

        {/* Available Blocks Sidebar */}
        <div className="w-64 flex-shrink-0 bg-slate-800 border border-slate-700 rounded-xl p-4 sticky top-8">
          <h3 className="font-semibold text-white mb-4">Add Section</h3>
          <div className="space-y-2">
            {Object.entries(SectionSchemas).map(([type, schema]) => (
              <button
                key={type}
                onClick={() => addSection(type as SectionType)}
                className="w-full flex items-center justify-between px-3 py-2 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
              >
                {schema.label}
                <Plus className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
