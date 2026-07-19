"use client";

import { useState } from "react";
import { FieldMeta } from "@/config/sections/section-schemas";
import { RepeatableFieldEditor } from "./RepeatableFieldEditor";
import { LayoutTemplate, X, CheckCircle2 } from "lucide-react";

interface FieldRendererProps {
  fieldKey: string;
  value: any;
  meta: FieldMeta;
  onChange: (key: string, value: any) => void;
  sectionType?: string;
}

export function FieldRenderer({ fieldKey, value, meta, onChange, sectionType }: FieldRendererProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const inputClass =
    "w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none";

  // Special Variant Selector Modal
  if (fieldKey === "variant" && meta.type === "select" && sectionType) {
    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          className="w-full flex items-center justify-between px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors border border-indigo-500 shadow-sm"
        >
          <span className="font-semibold text-sm">
            {value ? `Variant: ${value.toUpperCase()}` : "Choose Variant"}
          </span>
          <LayoutTemplate className="w-5 h-5" />
        </button>

        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 lg:p-12">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-7xl h-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <div>
                  <h2 className="text-xl font-bold text-white">Choose Design Variant</h2>
                  <p className="text-sm text-slate-400">Select a layout style for this section.</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-slate-900">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {meta.options?.map((opt) => {
                    const isSelected = value === opt;
                    return (
                      <div
                        key={opt}
                        onClick={() => {
                          onChange(fieldKey, opt);
                          setModalOpen(false);
                        }}
                        className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                          isSelected 
                            ? "border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] ring-2 ring-indigo-500/50" 
                            : "border-slate-700 hover:border-slate-500 hover:shadow-xl"
                        }`}
                      >
                        <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700/50 relative z-10">
                          <span className="font-semibold text-white uppercase tracking-wider text-sm">
                            {opt}
                          </span>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                        </div>
                        
                        {/* Scaled iframe preview */}
                        <div className="relative w-full aspect-[16/9] bg-white overflow-hidden flex items-center justify-center">
                          <div className="absolute top-1/2 left-1/2 w-[1600px] h-[900px] -translate-x-1/2 -translate-y-1/2 origin-center transform scale-[0.35] sm:scale-[0.4] lg:scale-[0.35] xl:scale-[0.45] pointer-events-none">
                            <iframe
                              src={`/preview?section=${sectionType}&variant=${opt}`}
                              className="w-full h-full border-0"
                              loading="lazy"
                              tabIndex={-1}
                            />
                          </div>
                          
                          {/* Hover Overlay */}
                          <div className={`absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors flex items-center justify-center ${isSelected ? 'bg-indigo-600/5' : ''}`}>
                            <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              <span className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-full shadow-lg">
                                Select Variant
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  switch (meta.type) {
    case "boolean":
      return (
        <label className="flex items-center gap-3 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(fieldKey, e.target.checked)}
              className="sr-only"
            />
            <div
              onClick={() => onChange(fieldKey, !value)}
              className={`w-10 h-6 rounded-full transition-colors cursor-pointer ${
                value ? "bg-indigo-600" : "bg-slate-700"
              }`}
            />
            <div
              onClick={() => onChange(fieldKey, !value)}
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform cursor-pointer ${
                value ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </div>
          <span className="text-sm text-slate-300">{value ? "Enabled" : "Disabled"}</span>
        </label>
      );

    case "color":
      return (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value && value.startsWith("#") ? value : "#4f46e5"}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            className="w-10 h-9 rounded cursor-pointer border border-slate-700 bg-slate-900 p-0.5"
          />
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            placeholder="#000000"
            className={`flex-1 ${inputClass}`}
          />
        </div>
      );

    case "number":
      return (
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(fieldKey, Number(e.target.value))}
          className={inputClass}
        />
      );

    case "textarea":
      return (
        <textarea
          rows={3}
          value={value || ""}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder={meta.placeholder}
        />
      );

    case "select":
      return (
        <select
          value={value || ""}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className={inputClass}
        >
          {meta.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      );

    case "datetime":
      // Convert ISO string to datetime-local format
      const localValue = value
        ? new Date(value).toISOString().slice(0, 16)
        : "";
      return (
        <input
          type="datetime-local"
          value={localValue}
          onChange={(e) => onChange(fieldKey, new Date(e.target.value).toISOString())}
          className={inputClass}
        />
      );

    case "image":
      return (
        <div className="space-y-2">
          <input
            type="url"
            value={value || ""}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className={inputClass}
          />
          {value && (
            <div className="relative w-full h-28 rounded-md overflow-hidden border border-slate-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      );

    case "url":
      return (
        <input
          type="url"
          value={value || ""}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
      );

    case "repeatable":
      return (
        <RepeatableFieldEditor
          label={meta.label}
          value={Array.isArray(value) ? value : []}
          itemSchema={meta.itemSchema || []}
          onChange={(newVal) => onChange(fieldKey, newVal)}
        />
      );

    case "text":
    default:
      return (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          placeholder={meta.placeholder}
          className={inputClass}
        />
      );
  }
}
