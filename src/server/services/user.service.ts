import { userRepository } from "../repositories/user.repository";

export class UserService {
  async getUsers(page: number, limit: number, role?: string) {
    const skip = (page - 1) * limit;
    const [users, totalCount] = await Promise.all([
      userRepository.findAll({ role, skip, take: limit }),
      userRepository.count({ role }),
    ]);

    return {
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })),
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async updateUserRole(id: string, newRole: string) {
    return userRepository.updateRole(id, newRole);
  }
}

export const userService = new UserService();
