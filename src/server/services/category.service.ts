import { categoryRepository } from "../repositories/category.repository";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export class CategoryService {
  async getCategoryTree() {
    return categoryRepository.findAll();
  }

  async getCategoryById(id: string) {
    return categoryRepository.findById(id);
  }

  async createCategory(data: {
    name: string;
    slug?: string;
    description?: string;
    image?: string;
    parentId?: string;
    sortOrder?: number;
    nameLocalized?: Record<string, string>;
  }) {
    const slug = data.slug || slugify(data.name);
    const existing = await categoryRepository.findBySlug(slug);
    if (existing) throw new Error(`Category slug "${slug}" already exists`);

    return categoryRepository.create({ ...data, slug });
  }

  async updateCategory(
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
    // Guard against circular parent references
    if (data.parentId === id) throw new Error("A category cannot be its own parent");
    return categoryRepository.update(id, data);
  }

  async deleteCategory(id: string) {
    const cat = await categoryRepository.findById(id);
    if (!cat) throw new Error("Category not found");
    if (cat.children && cat.children.length > 0) {
      throw new Error("Cannot delete a category that has sub-categories. Remove sub-categories first.");
    }
    return categoryRepository.delete(id);
  }
}

export const categoryService = new CategoryService();
