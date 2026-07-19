import { prisma } from "@/lib/prisma";
import { Star, Check, X, Trash2 } from "lucide-react";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      product: { select: { name: true, slug: true } },
    },
  });

  const pending = reviews.filter((r) => !r.isApproved);
  const approved = reviews.filter((r) => r.isApproved);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Star className="w-7 h-7 text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reviews</h1>
          <p className="text-sm text-slate-500">Moderate customer product reviews</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-amber-700">{pending.length}</div>
          <div className="text-sm text-amber-600">Pending Review</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-emerald-700">{approved.length}</div>
          <div className="text-sm text-emerald-600">Approved</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-700">{reviews.length}</div>
          <div className="text-sm text-slate-500">Total</div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Review</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{review.user.name}</div>
                  <div className="text-xs text-slate-400">{review.user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <a href={`/en/products/${review.product.slug}`} target="_blank" className="text-indigo-600 hover:underline text-sm">
                    {review.product.name}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <p className="line-clamp-2 text-slate-700">{review.comment || <span className="text-slate-400 italic">No comment</span>}</p>
                </td>
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{format(new Date(review.createdAt), "MMM d, yyyy")}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                    ${review.isApproved ? "bg-emerald-100 text-emerald-700" :
                      "bg-amber-100 text-amber-700"}`}>
                    {review.isApproved ? "APPROVED" : "PENDING"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {!review.isApproved && (
                      <form action={`/api/reviews/${review.id}/approve`} method="POST">
                        <button type="submit" className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="Approve">
                          <Check className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                    {review.isApproved && (
                      <form action={`/api/reviews/${review.id}/reject`} method="POST">
                        <button type="submit" className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors" title="Reject (Unapprove)">
                          <X className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400">No reviews submitted yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
