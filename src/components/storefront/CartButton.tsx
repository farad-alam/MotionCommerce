"use client";

import { useCart } from "@/providers/cart-provider";
import { ShoppingCart } from "lucide-react";

export function CartButton() {
  const { count, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
      aria-label={`Cart with ${count} items`}
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
