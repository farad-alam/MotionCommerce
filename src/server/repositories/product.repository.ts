import { prisma } from "@/lib/prisma";

export interface ProductCreateInput {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  sku?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stock?: number;
  status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  categoryIds?: string[];
  images?: { url: string; alt?: string; isDefault?: boolean; sortOrder?: number }[];
  variants?: { name: string; sku?: string; price: number; stock?: number; attributes: Record<string, string> }[];
}

export interface ProductUpdateInput extends Partial<Omit<ProductCreateInput, "categoryIds" | "images" | "variants">> {
  categoryIds?: string[];
}

export class ProductRepository {
  async findAll(params?: {
    skip?: number;
    take?: number;
    status?: string;
    categoryId?: string;
    search?: string;
    isFeatured?: boolean;
  }) {
    const { skip = 0, take = 50, status, categoryId, search, isFeatured } = params || {};

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (isFeatured !== undefined) where.isFeatured = isFeatured;
    if (search) where.name = { contains: search, mode: "insensitive" };
    if (categoryId) where.categories = { some: { categoryId } };

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        include: {
          images: { where: { isDefault: true }, take: 1 },
          categories: { include: { category: { select: { id: true, name: true } } } },
          _count: { select: { reviews: true, orderItems: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return { products, totalCount };
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        variants: { orderBy: { createdAt: "asc" } },
        categories: { include: { category: true } },
        reviews: { where: { isApproved: true }, take: 10, orderBy: { createdAt: "desc" }, include: { user: { select: { name: true, avatar: true } } } },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        variants: { where: { isActive: true }, orderBy: { createdAt: "asc" } },
        categories: { include: { category: true } },
        reviews: { where: { isApproved: true }, take: 10, orderBy: { createdAt: "desc" }, include: { user: { select: { name: true, avatar: true } } } },
      },
    });
  }

  async create(data: ProductCreateInput) {
    const { categoryIds, images, variants, price, compareAtPrice, costPrice, ...rest } = data;

    return prisma.product.create({
      data: {
        ...rest,
        price,
        compareAtPrice: compareAtPrice ?? null,
        costPrice: costPrice ?? null,
        categories: categoryIds
          ? { create: categoryIds.map((id) => ({ categoryId: id })) }
          : undefined,
        images: images
          ? { create: images }
          : undefined,
        variants: variants
          ? { create: variants }
          : undefined,
      },
      include: { images: true, variants: true, categories: { include: { category: true } } },
    });
  }

  async update(id: string, data: ProductUpdateInput) {
    const { categoryIds, price, compareAtPrice, costPrice, ...rest } = data;

    return prisma.$transaction(async (tx) => {
      if (categoryIds !== undefined) {
        await tx.productCategory.deleteMany({ where: { productId: id } });
        if (categoryIds.length > 0) {
          await tx.productCategory.createMany({
            data: categoryIds.map((catId) => ({ productId: id, categoryId: catId })),
          });
        }
      }

      return tx.product.update({
        where: { id },
        data: {
          ...rest,
          ...(price !== undefined && { price }),
          ...(compareAtPrice !== undefined && { compareAtPrice }),
          ...(costPrice !== undefined && { costPrice }),
        },
        include: { images: true, variants: true, categories: { include: { category: true } } },
      });
    });
  }

  async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }

  async count(params?: { status?: string }) {
    return prisma.product.count({
      where: params?.status ? { status: params.status as "DRAFT" | "ACTIVE" | "ARCHIVED" } : undefined,
    });
  }
}

export const productRepository = new ProductRepository();
