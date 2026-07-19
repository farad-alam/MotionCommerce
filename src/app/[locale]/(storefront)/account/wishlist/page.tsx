import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AccountWishlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const wishlist = await prisma.wishlistItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: { images: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12 px-4 border border-dashed border-slate-300 rounded-xl bg-slate-50">
          <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">Your wishlist is empty</h3>
          <p className="text-slate-500 mb-6">Save items you love here to buy them later.</p>
          <Link
            href={`/${locale}/products`}
            className="inline-flex px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item: any) => (
            <div key={item.id} className="group relative border border-slate-200 rounded-xl p-4 bg-white hover:shadow-md transition-all">
              <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all z-10">
                <Trash2 className="w-4 h-4" />
              </button>
              
              <Link href={`/${locale}/products/${item.product.slug}`} className="block">
                <div className="aspect-square bg-slate-50 rounded-lg mb-4 overflow-hidden relative">
                  {item.product.images[0]?.url ? (
                    <img 
                      src={item.product.images[0].url} 
                      alt={item.product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      No Image
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-slate-900 line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-indigo-600 transition-colors">
                  {item.product.name}
                </h3>
                <p className="font-bold text-slate-900 mb-4">৳{Number(item.product.price).toLocaleString()}</p>
              </Link>
              
              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg transition-colors">
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
