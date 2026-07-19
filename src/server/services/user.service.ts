import { userRepository } from "../repositories/user.repository";

export class UserService {
  async getUsers(page: number, limit: number, role?: string) {
    const skip = (page - 1) * limit;
    const [users, totalCount] = await Promise.all([
      userRepository.findAll({ role, skip, take: limit }),
      userRepository.count({ role }),
    ]);

    return {
      users: users.map((user: any) => ({
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

  async getUserById(id: string) {
    return userRepository.findById(id);
  }

  async updateUserRole(id: string, newRole: string) {
    return userRepository.updateRole(id, newRole);
  }

  async deleteUser(id: string) {
    return userRepository.delete(id);
  }
}

export const userService = new UserService();
