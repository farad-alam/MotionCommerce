import { prisma } from "@/lib/prisma";
import { Package, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    orderBy: { stock: "asc" },
    select: {
      id: true,
      name: true,
      sku: true,
      stock: true,
      lowStockThreshold: true,
      status: true,
      price: true,
    },
  });

  const lowStock = products.filter((p) => p.stock !== null && p.lowStockThreshold !== null && p.stock <= p.lowStockThreshold);
  const outOfStock = products.filter((p) => p.stock === 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Package className="w-7 h-7 text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
          <p className="text-sm text-slate-500">Monitor stock levels across all products</p>
        </div>
      </div>

      {/* Alerts */}
      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {outOfStock.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span><strong>{outOfStock.length}</strong> products are out of stock</span>
            </div>
          )}
          {lowStock.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span><strong>{lowStock.length}</strong> products are below low-stock threshold</span>
            </div>
          )}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-center">Stock</th>
              <th className="px-6 py-4 text-center">Low Stock At</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const isLow = product.stock !== null && product.lowStockThreshold !== null && product.stock <= product.lowStockThreshold && product.stock > 0;
              const isOut = product.stock === 0;
              return (
                <tr key={product.id} className={`hover:bg-slate-50 transition-colors ${isOut ? "bg-red-50/40" : isLow ? "bg-amber-50/40" : ""}`}>
                  <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{product.sku || "—"}</td>
                  <td className="px-6 py-4 text-slate-700">৳{Number(product.price).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-7 rounded-md font-bold text-sm
                      ${isOut ? "bg-red-100 text-red-700" : isLow ? "bg-amber-100 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                      {product.stock ?? "∞"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-500">{product.lowStockThreshold ?? "—"}</td>
                  <td className="px-6 py-4 text-center">
                    {isOut ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">Out of Stock</span>
                    ) : isLow ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">Low Stock</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700">In Stock</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
