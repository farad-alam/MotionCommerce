import { NextResponse } from "next/server";
import { configService } from "@/server/services/config.service";
import { auth } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pageLayout = await configService.getPageLayout(resolvedParams.slug);
  return NextResponse.json({ success: true, data: pageLayout });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await auth();
    if (!session || !["SUPER_ADMIN", "AGENCY_STAFF", "CLIENT_ADMIN"].includes(session.user?.role || "")) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 403 });
    }

    const resolvedParams = await params;
    const data = await req.json();
    const result = await configService.updatePageLayout(resolvedParams.slug, data);
    
    revalidateTag(CACHE_TAGS.PAGES);
    
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 });
  }
}
