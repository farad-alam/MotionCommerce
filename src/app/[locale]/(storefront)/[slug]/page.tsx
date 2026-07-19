import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const page = await prisma.page.findUnique({ where: { slug: resolvedParams.slug } });
  
  if (!page || !page.isActive) return {};
  
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Try to find a standard page
  const page = await prisma.page.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!page || !page.isActive) {
    // If no standard page, maybe check PageLayout (builder pages)
    const layout = await prisma.pageLayout.findUnique({
      where: { slug: resolvedParams.slug },
    });
    
    if (!layout || !layout.isActive) notFound();
    
    // Render builder layout
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{layout.title}</h1>
        {/* Basic render of sections for now */}
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-500 italic">Builder sections will be rendered here.</p>
          <pre className="bg-slate-50 p-4 rounded-lg mt-4 text-xs overflow-auto">
            {JSON.stringify(layout.sections, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  // Render standard HTML page
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 sm:mb-12 text-center">
        {page.title}
      </h1>
      
      <div 
        className="prose prose-slate prose-indigo max-w-none prose-headings:font-semibold prose-a:text-indigo-600 hover:prose-a:text-indigo-500"
        dangerouslySetInnerHTML={{ __html: page.contentHtml || "" }}
      />
    </div>
  );
}
