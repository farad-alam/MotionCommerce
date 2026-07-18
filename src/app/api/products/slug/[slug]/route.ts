import { NextRequest } from "next/server";
import { productController } from "@/server/controllers/product.controller";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return productController.getProductBySlug(slug);
}
