import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number | string;
    compareAtPrice?: number | string | null;
    stock: number;
    isFeatured: boolean;
    images: { url: string; alt?: string | null }[];
    categories: { category: { name: string; slug: string } }[];
  };
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const price = Number(product.price);
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : null;
  const image = product.images[0];
  const isOutOfStock = product.stock === 0;
  const discountPercent = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="group relative flex flex-col bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.alt || product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
            No image
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isFeatured && (
            <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              Featured
            </span>
          )}
          {discountPercent && (
            <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              -{discountPercent}%
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-slate-700 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              Out of stock
            </span>
          )}
        </div>

        {/* Quick action overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            className="w-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic (Phase 6)
            }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="text-xs text-slate-400 truncate">
          {product.categories[0]?.category.name || ""}
        </p>
        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-slate-900">৳{price.toLocaleString()}</span>
          {compareAtPrice && (
            <span className="text-xs text-slate-400 line-through">৳{compareAtPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
