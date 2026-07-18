import { prisma } from "@/lib/prisma";
import { ProductForm } from "../ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/products" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">New Product</h1>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
