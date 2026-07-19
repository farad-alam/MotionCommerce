import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } }
  });
  return NextResponse.json({ success: true, data: posts });
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["SUPER_ADMIN", "AGENCY_STAFF", "CLIENT_ADMIN"].includes(session.user?.role || "")) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 403 });
    }

    const data = await req.json();
    
    // Auto-generate slug if not provided
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: slug,
        excerpt: data.excerpt,
        content: data.content || {},
        contentHtml: data.contentHtml,
        coverImage: data.coverImage,
        status: data.status || "DRAFT",
        authorId: session.user.id,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      }
    });
    
    return NextResponse.json({ success: true, data: post });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 });
  }
}
