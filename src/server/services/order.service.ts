import { orderRepository } from "../repositories/order.repository";
import { Prisma } from "@prisma/client";

export class OrderService {
  async createOrder(data: Prisma.OrderCreateInput) {
    // Generate order number like MC-20260001
    const count = await orderRepository.count();
    const year = new Date().getFullYear();
    const orderNumber = `MC-${year}${(count + 1).toString().padStart(4, "0")}`;
    
    return orderRepository.create({
      ...data,
      orderNumber,
    });
  }

  async getOrderById(id: string) {
    const order = await orderRepository.findById(id);
    if (!order) throw new Error("Order not found");
    return order;
  }

  async getOrderByNumber(orderNumber: string) {
    const order = await orderRepository.findByOrderNumber(orderNumber);
    if (!order) throw new Error("Order not found");
    return order;
  }

  async getUserOrders(userId: string) {
    return orderRepository.findByUser(userId);
  }

  async updateOrderStatus(id: string, status: any) {
    return orderRepository.updateStatus(id, status);
  }
  
  async updatePaymentInfo(id: string, paymentStatus: any, paymentDetails?: any) {
    return orderRepository.updatePayment(id, paymentStatus, paymentDetails);
  }
}

export const orderService = new OrderService();
