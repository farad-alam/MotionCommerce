import { NextRequest } from "next/server";
import { categoryController } from "@/server/controllers/category.controller";

export async function GET() {
  return categoryController.getCategories();
}

export async function POST(req: NextRequest) {
  return categoryController.createCategory(req);
}
