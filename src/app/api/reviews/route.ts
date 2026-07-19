import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { productId, rating, title, comment } = await req.json();

    if (!productId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
    }

    // Check if user already reviewed this product
    const existing = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    });

    if (existing) {
      return NextResponse.json({ success: false, error: "You have already reviewed this product" }, { status: 400 });
    }

    // Check if the feature flag for reviews is enabled
    const features = await prisma.featureFlags.findFirst();
    if (features && features.flags && (features.flags as any).reviews === false) {
      return NextResponse.json({ success: false, error: "Reviews are currently disabled" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        productId,
        rating,
        title,
        comment,

        isApproved: false,
      },
    });

    return NextResponse.json({ success: true, data: review });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
