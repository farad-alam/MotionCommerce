import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getSiteConfig, getFeatureFlags } from "@/lib/storefront-data";
import { AddToCartButton } from "@/components/storefront/AddToCartButton";
import { WhatsAppOrderButton } from "@/components/storefront/WhatsAppOrderButton";
import { ProductReviewForm } from "@/components/storefront/ProductReviewForm";
import { Star, ChevronRight, Package, ShieldCheck, RotateCcw } from "lucide-react";
import type { Metadata } from "next";

interface PDPProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PDPProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription || undefined,
    openGraph: {
      images: product.images[0] ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PDPProps) {
  const { locale, slug } = await params;
  const [product, siteConfig, featureFlags] = await Promise.all([
    getProductBySlug(slug),
    getSiteConfig(),
    getFeatureFlags(),
  ]);

  if (!product) notFound();

  const price = Number(product.price);
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : null;
  const discountPercent = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  const whatsappEnabled = (featureFlags?.flags as Record<string, boolean>)?.whatsappOrders ?? false;
  const whatsappNumber = siteConfig?.whatsappNumber;
  const whatsappTemplate = siteConfig?.whatsappOrderTemplate ||
    "Hi! I'd like to order:\n\n{{items}}\n\nTotal: {{total}}";

  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : null;

  const reviewsEnabled = (featureFlags?.flags as Record<string, boolean>)?.enableReviews ?? true;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/${locale}/products`} className="hover:text-indigo-600 transition-colors">Products</Link>
        {product.categories[0] && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/${locale}/products?category=${product.categories[0].category.slug}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {product.categories[0].category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
            {product.images[0] ? (
              <img
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                No image available
              </div>
            )}
          </div>
          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <div
                  key={img.id}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${i === 0 ? "border-indigo-500" : "border-slate-200"}`}
                >
                  <img src={img.url} alt={img.alt || ""} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Category */}
          {product.categories[0] && (
            <Link
              href={`/${locale}/products?category=${product.categories[0].category.slug}`}
              className="text-sm text-indigo-600 hover:underline font-medium mb-2"
            >
              {product.categories[0].category.name}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          {avgRating && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= Math.round(avgRating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-500">({product.reviews.length} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-end gap-3 mt-4">
            <span className="text-3xl font-bold text-slate-900">৳{price.toLocaleString()}</span>
            {compareAtPrice && (
              <span className="text-lg text-slate-400 line-through mb-0.5">
                ৳{compareAtPrice.toLocaleString()}
              </span>
            )}
            {discountPercent && (
              <span className="mb-1 bg-rose-100 text-rose-600 text-sm font-bold px-2 py-0.5 rounded-full">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Short description */}
          {product.shortDescription && (
            <p className="mt-4 text-slate-600 leading-relaxed">{product.shortDescription}</p>
          )}

          {/* Stock badge */}
          <div className="mt-4">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Out of Stock
              </span>
            )}
          </div>

          {/* Variants (if any) */}
          {product.variants.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-slate-700 mb-2">Options</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    disabled={variant.stock === 0}
                    className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {variant.name}
                    {variant.price !== product.price && (
                      <span className="ml-1 text-xs text-slate-400">
                        (৳{Number(variant.price).toLocaleString()})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <AddToCartButton
              productId={product.id}
              stock={product.stock}
              className="flex-1"
              name={product.name}
              price={price}
              slug={product.slug}
              image={product.images?.[0]?.url}
            />
            {whatsappEnabled && whatsappNumber && (
              <WhatsAppOrderButton
                product={{ name: product.name, price, slug: product.slug }}
                whatsappNumber={whatsappNumber}
                template={whatsappTemplate}
                className="flex-1"
              />
            )}
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6">
            {[
              { icon: Package, label: "Free Shipping", sub: "on orders over ৳1000" },
              { icon: ShieldCheck, label: "Secure Payment", sub: "100% protected" },
              { icon: RotateCcw, label: "Easy Returns", sub: "within 7 days" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1">
                <Icon className="w-5 h-5 text-indigo-500" />
                <span className="text-xs font-medium text-slate-700">{label}</span>
                <span className="text-xs text-slate-400">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full description */}
      {product.description && (
        <div className="mt-12 border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Product Description</h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
            {product.description}
          </div>
        </div>
      )}

      {/* Reviews */}
      {(product.reviews.length > 0 || reviewsEnabled) && (
        <div className="mt-12 border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Customer Reviews
            {avgRating && (
              <span className="ml-3 text-base font-normal text-slate-500">
                {avgRating.toFixed(1)} / 5
              </span>
            )}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              {reviewsEnabled && <ProductReviewForm productId={product.id} />}
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              {product.reviews.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 border border-slate-100 rounded-xl">
                  <p className="text-slate-500">No reviews yet. Be the first to review this product!</p>
                </div>
              ) : (
                product.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl border border-slate-100 p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-slate-800">{review.user.name || "Customer"}</p>
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${star <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {review.title && <p className="mt-2 font-medium text-slate-700">{review.title}</p>}
                    {review.comment && <p className="mt-1 text-sm text-slate-600">{review.comment}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
