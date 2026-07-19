"use client";

import { Plus, Trash2 } from "lucide-react";

interface RepeatableFieldEditorProps {
  label: string;
  value: Record<string, any>[];
  itemSchema: string[];
  onChange: (newValue: Record<string, any>[]) => void;
}

export function RepeatableFieldEditor({
  label,
  value = [],
  itemSchema,
  onChange,
}: RepeatableFieldEditorProps) {
  const addItem = () => {
    const emptyItem: Record<string, any> = {};
    itemSchema.forEach((key) => {
      emptyItem[key] = "";
    });
    onChange([...value, emptyItem]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, key: string, val: any) => {
    const updated = value.map((item, i) => {
      if (i === index) return { ...item, [key]: val };
      return item;
    });
    onChange(updated);
  };

  const humanize = (key: string) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {label}
        </span>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 rounded-md transition-colors"
        >
          <Plus className="w-3 h-3" />
          Add Item
        </button>
      </div>

      {value.length === 0 && (
        <div className="text-center py-4 text-slate-500 text-xs border border-dashed border-slate-700 rounded-lg">
          No items yet. Click &quot;Add Item&quot; to add one.
        </div>
      )}

      <div className="space-y-3">
        {value.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-700 rounded-lg p-3 space-y-2"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">
                Item {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            {itemSchema.map((key) => (
              <div key={key}>
                <label className="block text-xs text-slate-500 mb-0.5">
                  {humanize(key)}
                </label>
                {key === "rating" ? (
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={item[key] ?? ""}
                    onChange={(e) =>
                      updateItem(index, key, Number(e.target.value))
                    }
                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                ) : key === "quote" || key === "description" ? (
                  <textarea
                    rows={2}
                    value={item[key] ?? ""}
                    onChange={(e) => updateItem(index, key, e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none resize-none"
                  />
                ) : key === "src" ? (
                  <input
                    type="url"
                    value={item[key] ?? ""}
                    placeholder="https://..."
                    onChange={(e) => updateItem(index, key, e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={item[key] ?? ""}
                    onChange={(e) => updateItem(index, key, e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
