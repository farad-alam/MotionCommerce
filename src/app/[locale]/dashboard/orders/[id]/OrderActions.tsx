"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface OrderActionsProps {
  orderId: string;
  currentStatus: string;
  paymentStatus: string;
}

export function OrderActions({ orderId, currentStatus, paymentStatus }: OrderActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (updateData: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error("Failed to update");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Payment Verification for Manual Modes */}
      {paymentStatus === "PENDING_VERIFICATION" && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-2">
          <h4 className="text-sm font-semibold text-amber-800 mb-2">Payment Verification Required</h4>
          <p className="text-xs text-amber-700 mb-3">
            Customer has submitted payment details. Please verify the transaction before approving.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdate({ paymentStatus: "PAID" })}
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Mark as Paid
            </button>
            <button
              onClick={() => handleUpdate({ paymentStatus: "FAILED" })}
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              <XCircle className="w-3.5 h-3.5" /> Reject
            </button>
          </div>
        </div>
      )}
      
      {/* Generic Payment Mark */}
      {paymentStatus === "UNPAID" && (
         <button
          onClick={() => handleUpdate({ paymentStatus: "PAID" })}
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
          Mark as Paid
        </button>
      )}

      {/* Status progression */}
      <h4 className="text-sm font-semibold text-slate-700 mt-2 mb-1">Update Status</h4>
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleUpdate({ status: "PROCESSING" })}
          disabled={loading || currentStatus === "PROCESSING"}
          className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Processing
        </button>
        <button
          onClick={() => handleUpdate({ status: "SHIPPED" })}
          disabled={loading || currentStatus === "SHIPPED"}
          className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Shipped
        </button>
        <button
          onClick={() => handleUpdate({ status: "DELIVERED" })}
          disabled={loading || currentStatus === "DELIVERED"}
          className="px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50"
        >
          Delivered
        </button>
        <button
          onClick={() => handleUpdate({ status: "CANCELLED" })}
          disabled={loading || currentStatus === "CANCELLED"}
          className="px-3 py-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          Cancelled
        </button>
      </div>
    </div>
  );
}
