import { NextResponse } from "next/server";
import { configService } from "@/server/services/config.service";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const seoConfig = await configService.getSeoConfig();
  return NextResponse.json({ success: true, data: seoConfig });
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session || !["SUPER_ADMIN", "AGENCY_STAFF", "CLIENT_ADMIN"].includes(session.user?.role || "")) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 403 });
    }

    const data = await req.json();
    const result = await configService.updateSeoConfig(data);
    
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 });
  }
}
