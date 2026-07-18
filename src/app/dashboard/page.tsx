import { prisma } from "@/lib/prisma";
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react";

export default async function DashboardPage() {
  const [userCount, orderCount, productCount] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.product.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Overview of your store's performance and recent activity.
      </p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-slate-500">Total Revenue</div>
          </div>
          <div className="text-3xl font-bold text-slate-800">$0.00</div>
        </div>

        {/* Total Orders */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-slate-500">Orders</div>
          </div>
          <div className="text-3xl font-bold text-slate-800">{orderCount}</div>
        </div>

        {/* Total Products */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Package className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-slate-500">Products</div>
          </div>
          <div className="text-3xl font-bold text-slate-800">{productCount}</div>
        </div>

        {/* Total Users */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-slate-500">Users</div>
          </div>
          <div className="text-3xl font-bold text-slate-800">{userCount}</div>
        </div>
      </div>
    </div>
  );
}
