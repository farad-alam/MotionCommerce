import { NextRequest } from "next/server";
import { BaseController } from "./base.controller";
import { userService } from "../services/user.service";
import { requireRole, Role } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { z } from "zod";
import { paginatedResponse } from "@/lib/api-response";

const updateRoleSchema = z.object({
  role: z.enum([
    Role.SUPER_ADMIN,
    Role.AGENCY_STAFF,
    Role.CLIENT_ADMIN,
    Role.CLIENT_STAFF,
    Role.CUSTOMER,
  ]),
});

export class UserController extends BaseController {
  async getUsers(req: NextRequest) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      
      const searchParams = req.nextUrl.searchParams;
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "50", 10);
      const role = searchParams.get("role") || undefined;

      const result = await userService.getUsers(page, limit, role);
      
      return paginatedResponse(result.users, result.pagination);
    } catch (error) {
      return this.error(error);
    }
  }

  async updateUserRole(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const currentUser = await requireRole(Role.SUPER_ADMIN); // Only super admin can change roles for now
      
      // We shouldn't let someone demote themselves or similar logic, but for simplicity:
      if (currentUser.id === params.id) {
        throw new Error("Cannot change your own role");
      }

      const body = await validateRequest(updateRoleSchema, await req.json());
      
      const updatedUser = await userService.updateUserRole(params.id, body.role);
      
      return this.success({ id: updatedUser.id, role: updatedUser.role });
    } catch (error) {
      return this.error(error);
    }
  }
}

export const userController = new UserController();
