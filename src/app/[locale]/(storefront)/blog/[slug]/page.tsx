import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true, avatar: true } } },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to blog
      </Link>
      
      <header className="mb-10 sm:mb-14 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-slate-400">{post.author.name.charAt(0)}</span>
              )}
            </div>
            <span className="font-medium text-slate-900">{post.author.name}</span>
          </div>
          <span>•</span>
          <time dateTime={post.publishedAt?.toISOString()}>
            {post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : ""}
          </time>
        </div>
      </header>

      {post.coverImage && (
        <figure className="mb-10 sm:mb-14 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <img src={post.coverImage} alt={post.title} className="w-full aspect-[21/9] object-cover" />
        </figure>
      )}

      <div 
        className="prose prose-lg prose-slate prose-indigo max-w-none prose-headings:font-bold prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
      />
    </article>
  );
}
