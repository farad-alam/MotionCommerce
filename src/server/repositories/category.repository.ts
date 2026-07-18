import { prisma } from "@/lib/prisma";

export class CategoryRepository {
  async findAll() {
    return prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: {
        children: {
          orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
          include: {
            children: { orderBy: [{ sortOrder: "asc" }] },
          },
        },
      },
      where: { parentId: null }, // Only top-level; children are nested
    });
  }

  async findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: { children: true, parent: true },
    });
  }

  async findBySlug(slug: string) {
    return prisma.category.findUnique({ where: { slug } });
  }

  async create(data: {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentId?: string;
    sortOrder?: number;
    nameLocalized?: Record<string, string>;
  }) {
    return prisma.category.create({ data });
  }

  async update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      description?: string;
      image?: string;
      parentId?: string | null;
      sortOrder?: number;
      isActive?: boolean;
      nameLocalized?: Record<string, string>;
    }
  ) {
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.category.delete({ where: { id } });
  }
}

export const categoryRepository = new CategoryRepository();
