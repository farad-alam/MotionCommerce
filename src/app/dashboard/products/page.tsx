import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: {
      images: { where: { isDefault: true }, take: 1 },
      categories: { include: { category: { select: { name: true } } } },
    },
    take: 100,
  });

  const statusStyles: Record<string, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-800",
    DRAFT: "bg-amber-100 text-amber-800",
    ARCHIVED: "bg-slate-100 text-slate-600",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Products</h1>
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Categories</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.images[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        className="h-10 w-10 rounded-md object-cover bg-slate-100"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                        No img
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-slate-900">{product.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{product.sku || "—"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {product.categories.map((c) => c.category.name).join(", ") || "—"}
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  ৳{Number(product.price).toLocaleString()}
                  {product.compareAtPrice && (
                    <span className="ml-2 text-xs text-slate-400 line-through">
                      ৳{Number(product.compareAtPrice).toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={product.stock <= product.lowStockThreshold ? "text-red-600 font-medium" : ""}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[product.status]}`}>
                    {product.status.toLowerCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/products/${product.id}/edit`}
                      className="text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No products yet.{" "}
            <Link href="/dashboard/products/new" className="text-indigo-600 hover:underline">
              Add your first product →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
