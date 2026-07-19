"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function ProductReviewForm({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, title, comment }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit review");
      
      setSuccess(true);
      toast.success("Review submitted successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
        <p className="text-slate-600 mb-3">Please sign in to write a review.</p>
        <a href="/login" className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-500 transition-colors">
          Sign In
        </a>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center text-emerald-700">
        <h3 className="font-semibold mb-2">Thank you for your review!</h3>
        <p className="text-sm">Your review has been submitted and is pending approval by the store admin.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-900">Write a Review</h3>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Rating *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 focus:outline-none focus:scale-110 transition-transform"
            >
              <Star 
                className={`w-6 h-6 ${
                  star <= (hoverRating || rating) 
                    ? "fill-amber-400 text-amber-400" 
                    : "text-slate-300"
                }`} 
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title (optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summary of your review"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Review (optional)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="What did you like or dislike?"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-500 disabled:opacity-50 transition-colors"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Review"}
      </button>
    </form>
  );
}
