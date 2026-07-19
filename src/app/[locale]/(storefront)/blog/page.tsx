import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog",
  description: "Read our latest news and articles.",
};

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true } } }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Our Blog</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Insights, updates, and stories from our team.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No blog posts published yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/${locale}/blog/${post.slug}`} className="block aspect-[16/9] bg-slate-100 overflow-hidden">
                {post.coverImage ? (
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                )}
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span>{post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : "Draft"}</span>
                  <span>•</span>
                  <span>{post.author.name}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                  <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-slate-600 line-clamp-3 mb-6 flex-1">
                  {post.excerpt || "Read more about this topic..."}
                </p>
                <div className="mt-auto">
                  <Link href={`/${locale}/blog/${post.slug}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
                    Read article <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
