import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";

/** Cached site config for the storefront – revalidates on SITE_CONFIG tag */
export const getSiteConfig = unstable_cache(
  async () => {
    return prisma.siteConfig.findFirst();
  },
  ["site-config"],
  { tags: [CACHE_TAGS.SITE_CONFIG], revalidate: 3600 }
);

/** Cached feature flags */
export const getFeatureFlags = unstable_cache(
  async () => {
    return prisma.featureFlags.findFirst();
  },
  ["feature-flags"],
  { tags: [CACHE_TAGS.FEATURES], revalidate: 3600 }
);

/** Cached categories for nav / filter */
export const getCategories = unstable_cache(
  async () => {
    return prisma.category.findMany({
      where: { isActive: true, parentId: null },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: {
        children: {
          where: { isActive: true },
          orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        },
      },
    });
  },
  ["categories"],
  { tags: [CACHE_TAGS.CATEGORIES], revalidate: 3600 }
);

/** Cached product listing with optional filters */
export const getProducts = unstable_cache(
  async (params?: { categoryId?: string; search?: string; limit?: number; skip?: number }) => {
    const { categoryId, search, limit = 24, skip = 0 } = params || {};

    const where: Record<string, unknown> = { status: "ACTIVE" };
    if (categoryId) where.categories = { some: { categoryId } };
    if (search) where.name = { contains: search, mode: "insensitive" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
        include: {
          images: { where: { isDefault: true }, take: 1 },
          categories: { include: { category: { select: { id: true, name: true, slug: true } } } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return { products, total };
  },
  ["products-listing"],
  { tags: [CACHE_TAGS.PRODUCTS], revalidate: 300 }
);

/** Individual product by slug (shorter revalidation) */
export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.product.findUnique({
      where: { slug, status: "ACTIVE" },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        variants: { where: { isActive: true }, orderBy: { createdAt: "asc" } },
        categories: { include: { category: { select: { id: true, name: true, slug: true } } } },
        reviews: {
          where: { isApproved: true },
          take: 10,
          orderBy: { createdAt: "desc" },
          include: { user: { select: { name: true, avatar: true } } },
        },
      },
    });
  },
  ["product-by-slug"],
  { tags: [CACHE_TAGS.PRODUCTS], revalidate: 300 }
);
