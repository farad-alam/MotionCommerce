import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { Search, Eye, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const { status, search } = await searchParams;

  const where = {
    ...(status ? { status: status as any } : {}),
    ...(search ? { orderNumber: { contains: search, mode: "insensitive" as any } } : {}),
  };

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true },
      },
      items: true,
    },
    take: 50,
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <form className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            name="search"
            defaultValue={search || ""}
            placeholder="Search order number..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </form>
        
        <div className="flex gap-2">
          <form className="flex items-center gap-2">
            {search && <input type="hidden" name="search" value={search} />}
            <select
              name="status"
              defaultValue={status || ""}
              onChange={(e) => e.target.form?.submit()}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    <Link href={`/dashboard/orders/${order.id}`} className="hover:text-indigo-600 transition-colors">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {format(new Date(order.createdAt), "MMM d, yyyy h:mm a")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{order.shippingName}</div>
                    <div className="text-slate-500 text-xs">{order.user?.email || order.guestEmail || "Guest"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                      ${order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' : 
                        order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border w-fit
                        ${order.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                          order.paymentStatus === 'PENDING_VERIFICATION' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-slate-50 text-slate-700 border-slate-200'}`}>
                        {order.paymentStatus.replace("_", " ")}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{order.paymentMethod.replace("_", " ")}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    ৳{Number(order.total).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
