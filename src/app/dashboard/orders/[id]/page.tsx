import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, User, MapPin, CreditCard, Receipt } from "lucide-react";
import { OrderActions } from "./OrderActions";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const order = await prisma.order.findUnique({
    where: { id: resolvedParams.id },
    include: {
      items: true,
      user: true,
    },
  });

  if (!order) notFound();

  // Type assertion since we know it's JSON from DB
  const paymentDetails = order.paymentDetails as Record<string, any> | null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-2">
        <Link
          href="/dashboard/orders"
          className="p-2 -ml-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            Order {order.orderNumber}
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border align-middle
              ${order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' : 
                order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                'bg-amber-50 text-amber-700 border-amber-200'}`}>
              {order.status}
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Placed on {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main details) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Items */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">Order Items</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center flex-shrink-0 text-xs text-slate-400">
                    No Img
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{item.name}</p>
                    {item.sku && <p className="text-xs text-slate-500 mt-0.5">SKU: {item.sku}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900">৳{Number(item.price).toLocaleString()}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <div className="w-24 text-right font-semibold text-slate-900">
                    ৳{Number(item.total).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Totals */}
            <div className="bg-slate-50/50 p-6 border-t border-slate-200">
              <div className="space-y-3 w-full sm:w-1/2 ml-auto">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">৳{Number(order.subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">৳{Number(order.shippingCost).toLocaleString()}</span>
                </div>
                {Number(order.discount) > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Discount</span>
                    <span className="font-medium">-৳{Number(order.discount).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-slate-900 pt-3 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-indigo-600">৳{Number(order.total).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">Payment Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Method</p>
                  <p className="font-medium text-slate-900">{order.paymentMethod.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                    ${order.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      order.paymentStatus === 'PENDING_VERIFICATION' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-slate-50 text-slate-700 border-slate-200'}`}>
                    {order.paymentStatus.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Manual Payment Details */}
              {paymentDetails && (
                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Customer Provided Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {paymentDetails.senderNumber && (
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Sender Number</p>
                        <p className="font-medium text-slate-900 font-mono">{paymentDetails.senderNumber}</p>
                      </div>
                    )}
                    {paymentDetails.transactionId && (
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Transaction ID</p>
                        <p className="font-medium text-slate-900 font-mono">{paymentDetails.transactionId}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          
          {/* Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Actions</h2>
            <OrderActions 
              orderId={order.id} 
              currentStatus={order.status} 
              paymentStatus={order.paymentStatus} 
            />
          </div>

          {/* Customer */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">Customer</h2>
            </div>
            <div className="p-6">
              <p className="font-medium text-slate-900">{order.user?.name || "Guest Checkout"}</p>
              <p className="text-sm text-slate-500 mt-1">{order.user?.email || order.guestEmail}</p>
              <p className="text-sm text-slate-500 mt-1">{order.user?.phone || order.guestPhone || "No phone"}</p>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">Shipping Address</h2>
            </div>
            <div className="p-6">
              <p className="font-medium text-slate-900">{order.shippingName}</p>
              <p className="text-sm text-slate-600 mt-2 whitespace-pre-wrap">{order.shippingAddress}</p>
              <p className="text-sm text-slate-600 mt-1">
                {order.shippingDistrict}
                {order.shippingPostalCode ? ` - ${order.shippingPostalCode}` : ""}
              </p>
              <p className="text-sm font-medium text-slate-700 mt-3 pt-3 border-t border-slate-100">
                Phone: {order.shippingPhone}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
