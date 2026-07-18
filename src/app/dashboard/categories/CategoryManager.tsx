"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ChevronRight, Pencil, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  children?: Category[];
}

interface CategoryManagerProps {
  initialCategories: Category[];
}

function CategoryRow({
  category,
  depth = 0,
  onDelete,
}: {
  category: Category;
  depth?: number;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <tr className="hover:bg-slate-50 transition-colors">
        <td className="px-6 py-3">
          <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 24}px` }}>
            {depth > 0 && <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />}
            <span className={`font-medium ${depth > 0 ? "text-slate-600" : "text-slate-900"}`}>
              {category.name}
            </span>
          </div>
        </td>
        <td className="px-6 py-3 text-slate-500 text-sm font-mono">{category.slug}</td>
        <td className="px-6 py-3">
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${category.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
            {category.isActive ? "Active" : "Inactive"}
          </span>
        </td>
        <td className="px-6 py-3 text-right">
          <button
            onClick={() => onDelete(category.id)}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </td>
      </tr>
      {category.children?.map((child) => (
        <CategoryRow key={child.id} category={child} depth={depth + 1} onDelete={onDelete} />
      ))}
    </>
  );
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newParentId, setNewParentId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const flatCategories = categories.flatMap((c) => [c, ...(c.children || [])]);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          parentId: newParentId || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create category");
      }
      setNewName("");
      setNewParentId("");
      setIsAdding(false);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Cannot delete this category");
      }
      router.refresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Categories</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-900">New Category</h2>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">{error}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Men's Clothing"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Parent Category (optional)</label>
              <select
                value={newParentId}
                onChange={(e) => setNewParentId(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">— Top Level —</option>
                {flatCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={saving || !newName.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {saving ? "Saving…" : "Create Category"}
            </button>
            <button
              onClick={() => { setIsAdding(false); setNewName(""); setNewParentId(""); setError(null); }}
              className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Name</th>
              <th className="px-6 py-4 text-left font-medium">Slug</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {categories.map((cat) => (
              <CategoryRow key={cat.id} category={cat} depth={0} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No categories yet. Add your first category above.
          </div>
        )}
      </div>
    </div>
  );
}
