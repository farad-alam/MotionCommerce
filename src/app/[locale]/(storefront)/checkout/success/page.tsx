"use client";

import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/providers/cart-provider";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams?.get("orderNumber");
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const { clearCart } = useCart();

  useEffect(() => {
    // Failsafe clear cart if it wasn't cleared in the submit handler
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" aria-hidden="true" />
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
        Order Confirmed!
      </h1>
      
      <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
        Thank you for your purchase. We've received your order and are getting it ready.
      </p>

      {orderNumber && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10 max-w-md mx-auto inline-block text-left w-full">
          <p className="text-sm font-medium text-slate-500 mb-1">Order Number</p>
          <p className="text-2xl font-bold text-indigo-600 font-mono tracking-wider">{orderNumber}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/${locale}/products`}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Shopping
        </Link>
        <Link
          href={`/${locale}/account/orders`}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
        >
          View My Orders <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
