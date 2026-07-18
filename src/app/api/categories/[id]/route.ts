import { NextRequest } from "next/server";
import { categoryController } from "@/server/controllers/category.controller";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return categoryController.updateCategory(req, id);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return categoryController.deleteCategory(id);
}
