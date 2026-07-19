import { categoryService } from "@/server/services/category.service";
import { CategoryManager } from "./CategoryManager";

export default async function CategoriesPage() {
  const categories = await categoryService.getCategoryTree();

  return <CategoryManager initialCategories={categories as any} />;
}
