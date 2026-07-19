import { prisma } from "@/lib/prisma";
import { Users, ShoppingCart, Package, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [userCount, orderCount, productCount, revenueResult, recentOrders] = await Promise.all([
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.count(),
    prisma.product.count(),
    prisma.order.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { total: true },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const revenue = Number(revenueResult._sum.total || 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Overview of your store's performance and recent activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-slate-800">৳{revenue.toLocaleString()}</div>
          <div className="text-sm font-medium text-slate-500 mt-1">Verified Revenue</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <Link href="/dashboard/orders" className="text-xs text-indigo-500 hover:underline flex items-center gap-0.5">
              View <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="text-3xl font-bold text-slate-800">{orderCount}</div>
          <div className="text-sm font-medium text-slate-500 mt-1">Total Orders</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Package className="w-5 h-5" />
            </div>
            <Link href="/dashboard/products" className="text-xs text-indigo-500 hover:underline flex items-center gap-0.5">
              View <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="text-3xl font-bold text-slate-800">{productCount}</div>
          <div className="text-sm font-medium text-slate-500 mt-1">Products</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
            <Link href="/dashboard/customers" className="text-xs text-indigo-500 hover:underline flex items-center gap-0.5">
              View <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="text-3xl font-bold text-slate-800">{userCount}</div>
          <div className="text-sm font-medium text-slate-500 mt-1">Customers</div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">Recent Orders</h2>
          <Link href="/dashboard/orders" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
            View all &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-3">Order #</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3">
                    <Link href={`/dashboard/orders/${order.id}`} className="font-medium text-indigo-600 hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-slate-700">{order.user?.name || "Guest"}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                      ${order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                      ${order.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                        order.paymentStatus === 'FAILED' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-600'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right font-semibold text-slate-800">
                    ৳{Number(order.total).toLocaleString()}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No orders placed yet.
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
