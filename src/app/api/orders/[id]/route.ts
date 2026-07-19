import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { orderService } from "@/server/services/order.service";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    // In real app, check permissions (SUPER_ADMIN, etc.)
    if (!session || !["SUPER_ADMIN", "CLIENT_ADMIN", "AGENCY_STAFF", "CLIENT_STAFF"].includes(session.user?.role || "")) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 403 });
    }

    const resolvedParams = await params;
    const body = await req.json();
    const { status, paymentStatus } = body;

    if (status) {
      await orderService.updateOrderStatus(resolvedParams.id, status);
    }
    
    if (paymentStatus) {
      await orderService.updatePaymentInfo(resolvedParams.id, paymentStatus);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message || "Failed to update order" } },
      { status: 500 }
    );
  }
}
