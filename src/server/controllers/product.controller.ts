import { NextRequest } from "next/server";
import { BaseController } from "./base.controller";
import { productService } from "../services/product.service";
import { requireRole, Role } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { z } from "zod";
import { paginatedResponse } from "@/lib/api-response";

const productImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  isDefault: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

const productVariantSchema = z.object({
  name: z.string().min(1),
  sku: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0).optional(),
  attributes: z.record(z.string(), z.string()),
});

const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  sku: z.string().optional(),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),
  stock: z.number().int().min(0).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional(),
  isFeatured: z.boolean().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
  images: z.array(productImageSchema).optional(),
  variants: z.array(productVariantSchema).optional(),
});

const updateProductSchema = createProductSchema.partial();

export class ProductController extends BaseController {
  async getProducts(req: NextRequest) {
    try {
      const sp = req.nextUrl.searchParams;
      const result = await productService.getProducts({
        page: parseInt(sp.get("page") || "1"),
        limit: parseInt(sp.get("limit") || "50"),
        status: sp.get("status") || undefined,
        categoryId: sp.get("categoryId") || undefined,
        search: sp.get("search") || undefined,
        isFeatured: sp.has("isFeatured") ? sp.get("isFeatured") === "true" : undefined,
      });
      return paginatedResponse(result.products, result.pagination);
    } catch (error) {
      return this.error(error);
    }
  }

  async getProductById(id: string) {
    try {
      const product = await productService.getProductById(id);
      return this.success(product);
    } catch (error) {
      return this.error(error);
    }
  }

  async getProductBySlug(slug: string) {
    try {
      const product = await productService.getProductBySlug(slug);
      return this.success(product);
    } catch (error) {
      return this.error(error);
    }
  }

  async createProduct(req: NextRequest) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      const data = await validateRequest(createProductSchema, await req.json());
      const product = await productService.createProduct(data);
      return this.created(product);
    } catch (error) {
      return this.error(error);
    }
  }

  async updateProduct(req: NextRequest, id: string) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      const data = await validateRequest(updateProductSchema, await req.json());
      const product = await productService.updateProduct(id, data);
      return this.success(product);
    } catch (error) {
      return this.error(error);
    }
  }

  async deleteProduct(id: string) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      await productService.deleteProduct(id);
      return this.success({ deleted: true });
    } catch (error) {
      return this.error(error);
    }
  }
}

export const productController = new ProductController();
