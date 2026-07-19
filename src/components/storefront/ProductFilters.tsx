"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";

interface FilterProps {
  categories: any[];
  locale: string;
}

export function ProductFilters({ categories, locale }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category");
  const currentSearch = searchParams.get("search");
  const currentSort = searchParams.get("sort");
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const inStock = searchParams.get("inStock") === "true";

  const [price, setPrice] = useState({ min: minPrice, max: maxPrice });

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    // Reset page on filter change
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePriceApply = () => {
    updateFilters({ minPrice: price.min, maxPrice: price.max });
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
          <SlidersHorizontal className="w-4 h-4" />
          Categories
        </div>
        <ul className="space-y-1">
          <li>
            <Link
              href={`${pathname}?${new URLSearchParams(
                Array.from(searchParams.entries()).filter(([k]) => k !== "category")
              ).toString()}`}
              className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${!currentCategory ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
            >
              All Products
            </Link>
          </li>
          {categories.map((cat: any) => (
            <li key={cat.id}>
              <Link
                href={`${pathname}?${new URLSearchParams({ ...Object.fromEntries(searchParams), category: cat.slug }).toString()}`}
                className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${currentCategory === cat.slug ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
              >
                {cat.name}
              </Link>
              {cat.children && cat.children.length > 0 && (
                <ul className="ml-3 mt-1 space-y-1 border-l border-slate-200 pl-3">
                  {cat.children.map((child: any) => (
                    <li key={child.id}>
                      <Link
                        href={`${pathname}?${new URLSearchParams({ ...Object.fromEntries(searchParams), category: child.slug }).toString()}`}
                        className={`block text-xs px-2 py-1 rounded-md transition-colors ${currentCategory === child.slug ? "text-indigo-700 font-medium" : "text-slate-500 hover:text-slate-800"}`}
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-slate-200" />

      {/* Sort By */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Sort By</label>
        <div className="relative">
          <select
            value={currentSort || "featured"}
            onChange={(e) => updateFilters({ sort: e.target.value === "featured" ? null : e.target.value })}
            className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Price Range</label>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            placeholder="Min"
            value={price.min}
            onChange={(e) => setPrice({ ...price, min: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-indigo-500"
          />
          <span className="text-slate-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={price.max}
            onChange={(e) => setPrice({ ...price, max: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-indigo-500"
          />
        </div>
        <button
          onClick={handlePriceApply}
          className="w-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded-lg transition-colors"
        >
          Apply Price
        </button>
      </div>

      <hr className="border-slate-200" />

      {/* Stock Status */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => updateFilters({ inStock: e.target.checked ? "true" : null })}
            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-slate-700">In Stock Only</span>
        </label>
      </div>
    </div>
  );
}
