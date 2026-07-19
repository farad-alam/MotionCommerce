import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BuilderOrdersPage() {
  // Lightweight view for Builder (recent 20 orders)
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
    take: 20,
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-6">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="w-8 h-8 text-indigo-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Recent Orders</h1>
          <p className="text-sm text-slate-400">Lightweight view of store activity</p>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400 font-semibold">
              <th className="px-6 py-4">Order Number</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-sm">
            {orders.map((order: any) => (
              <tr key={order.id} className="hover:bg-slate-800 transition-colors">
                <td className="px-6 py-4 font-medium text-white">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {format(new Date(order.createdAt), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                    ${order.status === 'DELIVERED' ? 'bg-emerald-500/20 text-emerald-400' : 
                      order.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' : 
                      'bg-amber-500/20 text-amber-400'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-medium text-white">
                  ৳{Number(order.total).toLocaleString()}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No recent orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-center">
        <Link href="/dashboard/orders" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          View all in Client Dashboard &rarr;
        </Link>
      </div>
    </div>
  );
}
