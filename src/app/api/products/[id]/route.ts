export const dynamic = 'force-dynamic';

import { NextRequest } from "next/server";
import { productController } from "@/server/controllers/product.controller";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return productController.getProductById(id);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return productController.updateProduct(req, id);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return productController.deleteProduct(id);
}
