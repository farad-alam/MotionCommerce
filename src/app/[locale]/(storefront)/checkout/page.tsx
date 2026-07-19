"use client";

import { useState } from "react";
import { useCart } from "@/providers/cart-provider";
import { useRouter, useParams } from "next/navigation";
import { Loader2, ArrowLeft, Truck, CreditCard, ShoppingBag, Tag, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Shipping Form
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingDistrict, setShippingDistrict] = useState("");
  
  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // Coupon
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discountAmount: number} | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const shippingCost = 60; // Flat rate for now
  const orderTotal = total + shippingCost - (appliedCoupon?.discountAmount || 0);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, cartTotal: total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid coupon");
      setAppliedCoupon(data.data);
      setCouponCode("");
      toast.success(`Coupon ${data.data.code} applied! (-৳${data.data.discountAmount})`);
    } catch (err: any) {
      setCouponError(err.message);
      toast.error(err.message);
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    toast.info("Coupon removed");
  };

  if (count === 0 && !loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6">Add items to your cart before checking out.</p>
        <Link
          href={`/${locale}/products`}
          className="inline-flex px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (paymentMethod !== "COD" && (!senderNumber || !transactionId)) {
      setError("Please provide payment details (Number and Transaction ID).");
      return;
    }

    setLoading(true);

    try {
      const paymentDetails = paymentMethod !== "COD" 
        ? { senderNumber, transactionId } 
        : null;

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingName,
          shippingPhone,
          shippingAddress,
          shippingDistrict,
          paymentMethod,
          paymentDetails,
          couponCode: appliedCoupon?.code,
          discountAmount: appliedCoupon?.discountAmount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to place order");
      }

      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/${locale}/checkout/success?orderNumber=${data.data.orderNumber}`);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link
        href={`/${locale}/cart`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to cart
      </Link>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Checkout Form */}
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            
            {/* Shipping Details */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-indigo-600" />
                Shipping Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Address *</label>
                  <textarea
                    required
                    rows={3}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="House, Street, Area..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    required
                    value={shippingDistrict}
                    onChange={(e) => setShippingDistrict(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Dhaka"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                Payment Method
              </h2>
              
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === "COD" ? "border-indigo-600 bg-indigo-50/50" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <div>
                    <span className="block font-medium text-slate-900">Cash on Delivery</span>
                    <span className="block text-sm text-slate-500">Pay when you receive your order</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === "BKASH_MANUAL" ? "border-indigo-600 bg-indigo-50/50" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="BKASH_MANUAL"
                    checked={paymentMethod === "BKASH_MANUAL"}
                    onChange={() => setPaymentMethod("BKASH_MANUAL")}
                    className="w-4 h-4 text-indigo-600 mt-1"
                  />
                  <div className="flex-1">
                    <span className="block font-medium text-slate-900">bKash (Send Money)</span>
                    <span className="block text-sm text-slate-500 mb-3">Send exact amount to our bKash account</span>
                    
                    {paymentMethod === "BKASH_MANUAL" && (
                      <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm space-y-3" onClick={e => e.preventDefault()}>
                        <div className="text-sm bg-indigo-50 p-3 rounded text-indigo-800">
                          Please send <strong className="text-lg">৳{orderTotal.toLocaleString()}</strong> to: <br/>
                          <span className="font-bold text-lg font-mono">01712345678</span> (Personal)
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Your bKash Number</label>
                            <input
                              type="text"
                              value={senderNumber}
                              onChange={(e) => setSenderNumber(e.target.value)}
                              className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
                              placeholder="01XXXXXXXXX"
                              required={paymentMethod === "BKASH_MANUAL"}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Transaction ID</label>
                            <input
                              type="text"
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value)}
                              className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
                              placeholder="TrxID"
                              required={paymentMethod === "BKASH_MANUAL"}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
                {error}
              </div>
            )}
            
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96 lg:flex-shrink-0">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.key} className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded bg-white border border-slate-200 overflow-hidden flex-shrink-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm font-medium text-slate-900 line-clamp-1">{item.name}</p>
                      {item.variantName && <p className="text-xs text-slate-500">{item.variantName}</p>}
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-900 mt-0.5">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm mb-6 pb-6 border-y border-slate-200 pt-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">৳{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">৳{shippingCost.toLocaleString()}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Coupon ({appliedCoupon.code})
                  </span>
                  <span>-৳{appliedCoupon.discountAmount.toLocaleString()}</span>
                </div>
              )}
            </div>
            
            {!appliedCoupon && (
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode || couponLoading}
                    className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50"
                  >
                    {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-xs mt-2">{couponError}</p>}
              </div>
            )}
            
            {appliedCoupon && (
              <div className="mb-6 flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium">
                  <Tag className="w-4 h-4" />
                  Code '{appliedCoupon.code}' applied
                </div>
                <button type="button" onClick={removeCoupon} className="text-emerald-600 hover:text-emerald-800 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <div className="flex justify-between items-end mb-8">
              <span className="text-base font-semibold text-slate-900">Total</span>
              <span className="text-2xl font-bold text-indigo-600">৳{orderTotal.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
