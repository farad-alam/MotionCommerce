import { NextResponse } from "next/server";
import { configService } from "@/server/services/config.service";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");
  
  if (!location) {
    return NextResponse.json({ success: false, error: { message: "Location parameter is required" } }, { status: 400 });
  }

  const navConfig = await configService.getNavigationConfig(location);
  return NextResponse.json({ success: true, data: navConfig });
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session || !["SUPER_ADMIN", "AGENCY_STAFF", "CLIENT_ADMIN"].includes(session.user?.role || "")) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    
    if (!location) {
      return NextResponse.json({ success: false, error: { message: "Location parameter is required" } }, { status: 400 });
    }

    const data = await req.json();
    const result = await configService.updateNavigationConfig(location, data);
    
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 });
  }
}
