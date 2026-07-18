import { NextRequest } from "next/server";
import { BaseController } from "./base.controller";
import { categoryService } from "../services/category.service";
import { requireRole, Role } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { z } from "zod";
import { paginatedResponse } from "@/lib/api-response";

const createCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url().optional(),
  parentId: z.string().optional(),
  sortOrder: z.number().int().optional(),
  nameLocalized: z.record(z.string()).optional(),
});

const updateCategorySchema = createCategorySchema.extend({
  parentId: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

export class CategoryController extends BaseController {
  async getCategories() {
    try {
      const tree = await categoryService.getCategoryTree();
      return this.success(tree);
    } catch (error) {
      return this.error(error);
    }
  }

  async createCategory(req: NextRequest) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      const data = await validateRequest(createCategorySchema, await req.json());
      const category = await categoryService.createCategory(data);
      return this.created(category);
    } catch (error) {
      return this.error(error);
    }
  }

  async updateCategory(req: NextRequest, id: string) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      const data = await validateRequest(updateCategorySchema, await req.json());
      const category = await categoryService.updateCategory(id, data);
      return this.success(category);
    } catch (error) {
      return this.error(error);
    }
  }

  async deleteCategory(id: string) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      await categoryService.deleteCategory(id);
      return this.success({ deleted: true });
    } catch (error) {
      return this.error(error);
    }
  }
}

export const categoryController = new CategoryController();
