import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { code, cartTotal } = await req.json();

    if (!code) {
      return NextResponse.json({ success: false, error: "Coupon code is required" }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!coupon) {
      return NextResponse.json({ success: false, error: "Invalid coupon code" }, { status: 404 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ success: false, error: "This coupon is not active" }, { status: 400 });
    }

    const now = new Date();
    if (coupon.startsAt && new Date(coupon.startsAt) > now) {
      return NextResponse.json({ success: false, error: "This coupon is not valid yet" }, { status: 400 });
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
      return NextResponse.json({ success: false, error: "This coupon has expired" }, { status: 400 });
    }

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json({ success: false, error: "Coupon usage limit reached" }, { status: 400 });
    }

    if (coupon.minOrderAmount !== null && cartTotal < Number(coupon.minOrderAmount)) {
      return NextResponse.json({ success: false, error: `Minimum purchase of ৳${coupon.minOrderAmount} required` }, { status: 400 });
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (coupon.type === "PERCENTAGE") {
      discountAmount = (cartTotal * Number(coupon.value)) / 100;
    } else if (coupon.type === "FIXED_AMOUNT") {
      discountAmount = Number(coupon.value);
    }

    // Max discount cap for percentage
    if (coupon.type === "PERCENTAGE" && coupon.maxDiscount !== null && discountAmount > Number(coupon.maxDiscount)) {
      discountAmount = Number(coupon.maxDiscount);
    }

    // Don't discount more than the cart total
    if (discountAmount > cartTotal) {
      discountAmount = cartTotal;
    }

    return NextResponse.json({
      success: true,
      data: {
        code: coupon.code,
        discountAmount,
        discountType: coupon.type,
        discountValue: Number(coupon.value)
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
