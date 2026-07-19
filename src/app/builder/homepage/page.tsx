"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Save,
  Plus,
  Trash2,
  GripVertical,
  LayoutTemplate,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import {
  SectionSchemas,
  SectionType,
} from "@/config/sections/section-schemas";
import { FieldRenderer } from "./FieldRenderer";

// ── DnD Kit ──────────────────────────────────────────────────────────────────
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ── Helpers ───────────────────────────────────────────────────────────────────
function humanize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

// ── Sortable Section Card ─────────────────────────────────────────────────────
function SortableSectionCard({
  section,
  onUpdate,
  onRemove,
}: {
  section: any;
  onUpdate: (id: string, key: string, value: any) => void;
  onRemove: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const schema = SectionSchemas[section.type as SectionType];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
    >
      {/* Card Header */}
      <div className="bg-slate-900/60 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300 touch-none"
            title="Drag to reorder"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex items-center gap-2 text-white font-semibold hover:text-indigo-300 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
            <span>{schema?.label || section.type}</span>
          </button>
        </div>

        <button
          onClick={() => onRemove(section.id)}
          className="text-slate-500 hover:text-red-400 transition-colors"
          title="Remove section"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Card Fields */}
      {!collapsed && (
        <div className="p-5 space-y-5">
          {Object.keys(section.settings).map((key) => {
            const meta = schema?.fieldMeta?.[key];
            if (!meta) {
              // Fallback for unknown fields — render a plain text input
              return (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    {humanize(key)}
                  </label>
                  <input
                    type="text"
                    value={
                      typeof section.settings[key] === "object"
                        ? JSON.stringify(section.settings[key])
                        : section.settings[key] || ""
                    }
                    onChange={(e) => onUpdate(section.id, key, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              );
            }

            // Skip rendering the label inside repeatable (it has its own header)
            return (
              <div key={key}>
                {meta.type !== "repeatable" && (
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    {meta.label}
                  </label>
                )}
                <FieldRenderer
                  fieldKey={key}
                  value={section.settings[key]}
                  meta={meta}
                  onChange={(k, v) => onUpdate(section.id, k, v)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function HomepageBuilder() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<any[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await fetch("/api/config/pages/homepage");
        const json = await res.json();
        if (json.data?.sections) {
          setSections(json.data.sections);
        } else {
          setSections([
            {
              id: "s1",
              type: "hero",
              settings: { ...SectionSchemas["hero"].defaultSettings },
            },
            {
              id: "s2",
              type: "category-grid",
              settings: { ...SectionSchemas["category-grid"].defaultSettings },
            },
            {
              id: "s3",
              type: "product-grid",
              settings: { ...SectionSchemas["product-grid"].defaultSettings },
            },
          ]);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load homepage layout.");
      } finally {
        setLoading(false);
      }
    };
    fetchLayout();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/config/pages/homepage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Homepage",
          slug: "homepage",
          sections,
        }),
      });
      if (!res.ok) throw new Error("Server returned an error");
      toast.success("Homepage layout saved!", {
        description: "Changes are now live on your storefront.",
        action: {
          label: "View Storefront",
          onClick: () => window.open("/en", "_blank"),
        },
      });
    } catch (err) {
      toast.error("Failed to save homepage.", {
        description: "Please try again or check your connection.",
      });
    } finally {
      setSaving(false);
    }
  };

  const addSection = (type: SectionType) => {
    const newSection = {
      id: `sec_${Date.now()}`,
      type,
      settings: { ...SectionSchemas[type].defaultSettings },
    };
    setSections((prev) => [...prev, newSection]);
    toast.success(`${SectionSchemas[type].label} section added.`);
  };

  const updateSectionSetting = useCallback(
    (id: string, key: string, value: any) => {
      setSections((prev) =>
        prev.map((sec) => {
          if (sec.id === id) {
            return { ...sec, settings: { ...sec.settings, [key]: value } };
          }
          return sec;
        })
      );
    },
    []
  );

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-400 animate-pulse">Loading builder...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <LayoutTemplate className="w-8 h-8 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Homepage Builder</h1>
            <p className="text-sm text-slate-400">
              Drag sections to reorder. Click to expand and edit.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/en"
            target="_blank"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Storefront
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Layout"}
          </button>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Editor Area */}
        <div className="flex-1 min-w-0">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {sections.map((section) => (
                  <SortableSectionCard
                    key={section.id}
                    section={section}
                    onUpdate={updateSectionSetting}
                    onRemove={removeSection}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {sections.length === 0 && (
            <div className="text-center py-16 border border-dashed border-slate-700 rounded-xl text-slate-500">
              <LayoutTemplate className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No sections yet. Add one from the sidebar.</p>
            </div>
          )}
        </div>

        {/* Add Section Sidebar */}
        <div className="w-64 flex-shrink-0 bg-slate-800 border border-slate-700 rounded-xl p-4 sticky top-8">
          <h3 className="font-semibold text-white mb-1">Add Section</h3>
          <p className="text-xs text-slate-500 mb-4">
            Click to append to the bottom
          </p>
          <div className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
            {Object.entries(SectionSchemas).map(([type, schema]) => (
              <button
                key={type}
                onClick={() => addSection(type as SectionType)}
                className="w-full flex items-center justify-between px-3 py-2 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors text-left"
              >
                <span>{schema.label}</span>
                <Plus className="w-4 h-4 flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
