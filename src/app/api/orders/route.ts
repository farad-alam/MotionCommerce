import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { orderService } from "@/server/services/order.service";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const {
      items, // { productId, variantId, quantity }
      shippingName,
      shippingPhone,
      shippingAddress,
      shippingDivision,
      shippingDistrict,
      shippingPostalCode,
      paymentMethod, // e.g., "COD", "BKASH_MANUAL"
      paymentDetails, // e.g., { senderNumber, transactionId }
      couponCode, // Optional coupon code
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: { message: "Cart is empty" } }, { status: 400 });
    }

    // Calculate totals server-side
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) continue;

      let price = Number(product.price);
      let variantName = undefined;
      let sku = product.sku;

      if (item.variantId) {
        const variant = await prisma.productVariant.findUnique({ where: { id: item.variantId } });
        if (variant) {
          price = Number(variant.price);
          variantName = variant.name;
          sku = variant.sku || product.sku;
        }
      }

      const total = price * item.quantity;
      subtotal += total;

      orderItemsData.push({
        productId: product.id,
        variantId: item.variantId || undefined,
        name: product.name + (variantName ? ` - ${variantName}` : ""),
        sku,
        price,
        quantity: item.quantity,
        total,
      });
    }

    const shippingCost = 60; // Flat rate for now
    let discount = 0;
    let couponId = undefined;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() }
      });
      
      if (coupon && coupon.isActive) {
        const now = new Date();
        const validStart = !coupon.startsAt || new Date(coupon.startsAt) <= now;
        const validEnd = !coupon.expiresAt || new Date(coupon.expiresAt) >= now;
        const underLimit = coupon.usageLimit === null || coupon.usedCount < coupon.usageLimit;
        const overMin = coupon.minOrderAmount === null || subtotal >= Number(coupon.minOrderAmount);

        if (validStart && validEnd && underLimit && overMin) {
          couponId = coupon.id;
          
          if (coupon.type === "PERCENTAGE") {
            discount = (subtotal * Number(coupon.value)) / 100;
            if (coupon.maxDiscount !== null && discount > Number(coupon.maxDiscount)) {
              discount = Number(coupon.maxDiscount);
            }
          } else {
            discount = Number(coupon.value);
          }
          
          if (discount > subtotal) discount = subtotal;

          // Increment usage count
          await prisma.coupon.update({
            where: { id: coupon.id },
            data: { usedCount: { increment: 1 } }
          });
        }
      }
    }

    const tax = 0;
    const total = subtotal + shippingCost + tax - discount;

    const paymentStatus = paymentMethod === "COD" ? "UNPAID" : "PENDING_VERIFICATION";

    const order = await orderService.createOrder({
      orderNumber: "MC-" + Date.now().toString().slice(-8),
      user: session?.user?.id ? { connect: { id: session.user.id } } : undefined,
      guestEmail: session?.user?.email ? undefined : body.guestEmail,
      guestPhone: session?.user?.email ? undefined : body.guestPhone,
      shippingName,
      shippingPhone,
      shippingAddress,
      shippingDivision,
      shippingDistrict,
      shippingPostalCode,
      paymentMethod,
      paymentMode: "MANUAL",
      paymentStatus,
      paymentDetails,
      subtotal,
      shippingCost,
      discount,
      tax,
      total,
      coupon: couponId ? { connect: { id: couponId } } : undefined,
      items: {
        create: orderItemsData,
      },
    });

    return NextResponse.json({ success: true, data: order });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message || "Failed to create order" } },
      { status: 500 }
    );
  }
}
