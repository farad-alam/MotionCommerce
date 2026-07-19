import { prisma } from "@/lib/prisma";
import { Order, OrderItem, Prisma } from "@prisma/client";

export class OrderRepository {
  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return prisma.order.create({
      data,
      include: { items: true },
    });
  }

  async findById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        address: true,
      },
    });
  }

  async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
        address: true,
      },
    });
  }

  async findByUser(userId: string): Promise<Order[]> {
    return prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateStatus(id: string, status: any): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
  }
  
  async updatePayment(id: string, paymentStatus: any, paymentDetails?: any): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: { 
        paymentStatus,
        ...(paymentDetails ? { paymentDetails } : {})
      },
    });
  }

  async count(): Promise<number> {
    return prisma.order.count();
  }
}

export const orderRepository = new OrderRepository();
