import { productRepository, ProductCreateInput, ProductUpdateInput } from "../repositories/product.repository";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export class ProductService {
  async getProducts(params?: {
    page?: number;
    limit?: number;
    status?: string;
    categoryId?: string;
    search?: string;
    isFeatured?: boolean;
  }) {
    const page = params?.page || 1;
    const limit = params?.limit || 50;
    const skip = (page - 1) * limit;

    const { products, totalCount } = await productRepository.findAll({
      skip,
      take: limit,
      status: params?.status,
      categoryId: params?.categoryId,
      search: params?.search,
      isFeatured: params?.isFeatured,
    });

    return {
      products,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async getProductById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async getProductBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async createProduct(data: Omit<ProductCreateInput, "slug"> & { slug?: string }) {
    const slug = data.slug || slugify(data.name);
    return productRepository.create({ ...data, slug });
  }

  async updateProduct(id: string, data: ProductUpdateInput) {
    await productRepository.findById(id); // Ensure exists
    return productRepository.update(id, data);
  }

  async deleteProduct(id: string) {
    await productRepository.findById(id); // Ensure exists
    return productRepository.delete(id);
  }
}

export const productService = new ProductService();
