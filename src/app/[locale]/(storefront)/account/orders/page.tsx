import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AccountOrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12 px-4 border border-dashed border-slate-300 rounded-xl bg-slate-50">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">No orders yet</h3>
          <p className="text-slate-500 mb-6">You haven't placed any orders with us yet.</p>
          <Link
            href={`/${locale}/products`}
            className="inline-flex px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-sm transition-shadow bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-semibold text-slate-900">Order {order.orderNumber}</h3>
                  <p className="text-sm text-slate-500 mt-1">Placed on {format(new Date(order.createdAt), "MMM d, yyyy")}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">৳{Number(order.total).toLocaleString()}</p>
                    <span className={`inline-flex mt-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' : 
                        'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2 overflow-hidden">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="w-10 h-10 rounded-lg bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-400 overflow-hidden relative z-10">
                      {/* Image placeholder */}
                      <span className="truncate max-w-[2ch]">{item.name.charAt(0)}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-500 relative z-0">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                
                <Link
                  href={`/${locale}/checkout/success?orderNumber=${order.orderNumber}`}
                  className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
