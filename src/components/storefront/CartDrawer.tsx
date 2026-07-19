"use client";

import { useCart } from "@/providers/cart-provider";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export function CartDrawer() {
  const { items, count, total, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <h2 className="font-semibold text-slate-900 text-lg">
              Cart
              {count > 0 && (
                <span className="ml-2 text-sm font-normal text-slate-500">({count} items)</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <ShoppingBag className="w-16 h-16 text-slate-200" />
              <div>
                <p className="font-semibold text-slate-700">Your cart is empty</p>
                <p className="text-sm text-slate-400 mt-1">Add some products to get started!</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item: any) => (
              <div
                key={item.key}
                className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/${locale}/products/${item.slug}`}
                    onClick={closeCart}
                    className="text-sm font-medium text-slate-800 hover:text-indigo-600 line-clamp-2 transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.variantName && (
                    <p className="text-xs text-slate-500 mt-0.5">{item.variantName}</p>
                  )}
                  <p className="text-sm font-semibold text-indigo-600 mt-1">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="px-2 py-1 text-slate-500 hover:bg-slate-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-sm font-medium min-w-[1.75rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="px-2 py-1 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (only if items exist) */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">৳{total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-400">Shipping calculated at checkout</p>
            <Link
              href={`/${locale}/checkout`}
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors shadow-sm"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/cart`}
              onClick={closeCart}
              className="flex items-center justify-center w-full py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
            >
              View Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
