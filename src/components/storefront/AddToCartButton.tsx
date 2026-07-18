"use client";

import { ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
  className?: string;
  variantId?: string;
}

export function AddToCartButton({ productId, stock, className = "", variantId }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const isOutOfStock = stock === 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    setLoading(true);

    // --- Cart Logic ---
    // For guest users: store in localStorage.
    // For logged-in users: POST /api/cart (Phase 6 - Checkout).
    // For now we use localStorage as a client-side guest cart (feature from plan).
    try {
      const cartKey = "mc_guest_cart";
      const existing = JSON.parse(localStorage.getItem(cartKey) || "[]");
      const key = variantId ? `${productId}::${variantId}` : productId;
      const idx = existing.findIndex((i: Record<string, unknown>) => i.key === key);
      if (idx >= 0) {
        existing[idx].quantity += quantity;
      } else {
        existing.push({ key, productId, variantId, quantity });
      }
      localStorage.setItem(cartKey, JSON.stringify(existing));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Quantity stepper */}
      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          className="px-3 py-2 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
        >
          −
        </button>
        <span className="px-3 py-2 text-sm font-medium min-w-[2.5rem] text-center">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
          disabled={quantity >= stock || isOutOfStock}
          className="px-3 py-2 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
        >
          +
        </button>
      </div>
      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock || loading}
        className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
          added
            ? "bg-emerald-600 text-white"
            : isOutOfStock
            ? "bg-slate-200 text-slate-500 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white shadow-sm"
        }`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ShoppingCart className="w-4 h-4" />
        )}
        {added ? "Added!" : isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}
