"use client";

import { ShoppingCart, Loader2, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/providers/cart-provider";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
  className?: string;
  variantId?: string;
  name: string;
  price: number;
  image?: string;
  slug: string;
  variantName?: string;
}

export function AddToCartButton({
  productId,
  stock,
  className = "",
  variantId,
  name,
  price,
  image,
  slug,
  variantName,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();
  const isOutOfStock = stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({ productId, variantId, name, price, image, slug, variantName, stock, quantity });
    setAdded(true);
    toast.success(`${quantity}x ${name} added to cart`);
    openCart();
    setTimeout(() => setAdded(false), 2000);
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
        disabled={isOutOfStock}
        className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
          added
            ? "bg-emerald-600 text-white"
            : isOutOfStock
            ? "bg-slate-200 text-slate-500 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white shadow-sm"
        }`}
      >
        {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
        {added ? "Added!" : isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}
