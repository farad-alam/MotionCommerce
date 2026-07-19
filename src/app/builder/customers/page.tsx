import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Users } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BuilderCustomersPage() {
  // Lightweight view for Builder (recent 20 customers)
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-6">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-8 h-8 text-indigo-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Recent Customers</h1>
          <p className="text-sm text-slate-400">Lightweight view of user signups</p>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400 font-semibold">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-sm">
            {customers.map((customer: any) => (
              <tr key={customer.id} className="hover:bg-slate-800 transition-colors">
                <td className="px-6 py-4 font-medium text-white">
                  {customer.name}
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {customer.email}
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {format(new Date(customer.createdAt), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                    ${customer.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {customer.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <Link href="/dashboard/customers" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          View all in Client Dashboard &rarr;
        </Link>
      </div>
    </div>
  );
}
