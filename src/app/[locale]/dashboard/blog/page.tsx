import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { FileText, Plus, Edit, Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } }
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
            <p className="text-sm text-slate-500">Manage your store's blog content</p>
          </div>
        </div>
        <Link 
          href="/dashboard/blog/new" 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {posts.map((post: any) => (
              <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{post.title}</div>
                  <div className="text-xs text-slate-500 mt-1">/{post.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                    ${post.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {post.author.name}
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {format(new Date(post.createdAt), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/en/blog/${post.slug}`} target="_blank" className="text-slate-400 hover:text-indigo-600">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link href={`/dashboard/blog/${post.id}`} className="text-slate-400 hover:text-indigo-600">
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No blog posts found. Create your first post!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
