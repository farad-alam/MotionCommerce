import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, data: coupons });
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["SUPER_ADMIN", "AGENCY_STAFF", "CLIENT_ADMIN"].includes(session.user?.role || "")) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 403 });
    }
    const data = await req.json();
    const coupon = await prisma.coupon.create({
      data: {
        code: data.code.toUpperCase(),
        type: data.type,
        value: data.value,
        minOrderAmount: data.minOrderAmount || null,
        usageLimit: data.maxUses || null,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        isActive: data.isActive !== false,
      },
    });
    return NextResponse.json({ success: true, data: coupon });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 });
  }
}
