"use client";

import { FieldMeta } from "@/config/sections/section-schemas";
import { RepeatableFieldEditor } from "./RepeatableFieldEditor";

interface FieldRendererProps {
  fieldKey: string;
  value: any;
  meta: FieldMeta;
  onChange: (key: string, value: any) => void;
}

export function FieldRenderer({ fieldKey, value, meta, onChange }: FieldRendererProps) {
  const inputClass =
    "w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none";

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
