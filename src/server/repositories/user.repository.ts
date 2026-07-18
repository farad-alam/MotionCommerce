import { prisma } from "@/lib/prisma";
import { BaseRepository } from "./base.repository";

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findAll(params?: { role?: string; skip?: number; take?: number }) {
    return prisma.user.findMany({
      where: params?.role ? { role: params.role } : undefined,
      skip: params?.skip || 0,
      take: params?.take || 50,
      orderBy: { createdAt: 'desc' }
    });
  }

  async count(params?: { role?: string }) {
    return prisma.user.count({
      where: params?.role ? { role: params.role } : undefined,
    });
  }

  async updateRole(id: string, role: string) {
    return prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}

export const userRepository = new UserRepository();
