"use client";

import { useCart } from "@/providers/cart-provider";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-50 rounded-full mb-6">
          <ShoppingBag className="w-10 h-10 text-slate-300" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Your cart is empty</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Browse our products and find something you love.
        </p>
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center justify-center px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-sm active:scale-95"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-slate-200 text-sm font-medium text-slate-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          {items.map((item) => (
            <div
              key={item.key}
              className="group flex flex-col sm:grid sm:grid-cols-12 gap-4 items-start sm:items-center py-4 border-b border-slate-100 last:border-0"
            >
              {/* Product Info */}
              <div className="col-span-6 flex gap-4 w-full">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <Link
                    href={`/${locale}/products/${item.slug}`}
                    className="text-base font-semibold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  {item.variantName && (
                    <p className="text-sm text-slate-500 mt-1">{item.variantName}</p>
                  )}
                  <p className="text-sm font-medium text-indigo-600 mt-2 sm:hidden">
                    ৳{item.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-red-500 mt-3 transition-colors sm:hidden"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="col-span-3 w-full flex justify-between sm:justify-center items-center">
                <span className="text-sm text-slate-500 sm:hidden">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                    className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1.5 text-sm font-medium min-w-[2.5rem] text-center border-x border-slate-100">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Price / Actions */}
              <div className="col-span-3 w-full flex justify-end items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-slate-900 text-lg">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">৳{item.price.toLocaleString()} each</p>
                </div>
                <button
                  onClick={() => removeItem(item.key)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors hidden sm:block opacity-0 group-hover:opacity-100"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96 lg:flex-shrink-0">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6 pb-6 border-b border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">৳{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-slate-400 italic">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span className="text-slate-400 italic">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="text-base font-semibold text-slate-900">Estimated Total</span>
              <span className="text-2xl font-bold text-indigo-600">৳{total.toLocaleString()}</span>
            </div>

            <div className="space-y-3">
              <Link
                href={`/${locale}/checkout`}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-sm active:scale-95"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button
                onClick={() => {
                  const text = `Hello! I'd like to place an order for:\n\n${items.map(i => `- ${i.name} (x${i.quantity})`).join('\n')}\n\nTotal: ৳${total.toLocaleString()}`;
                  window.open(`https://wa.me/8801712345678?text=${encodeURIComponent(text)}`, "_blank");
                }}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-xl transition-all shadow-sm active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Order via WhatsApp
              </button>
            </div>
            
            <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1.5">
              <span>Secure checkout powered by MotionCommerce</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
