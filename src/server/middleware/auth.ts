import { auth } from "@/lib/auth";
import { AppError, ERROR_CODES } from "@/lib/errors";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  AGENCY_STAFF = "AGENCY_STAFF",
  CLIENT_ADMIN = "CLIENT_ADMIN",
  CLIENT_STAFF = "CLIENT_STAFF",
  CUSTOMER = "CUSTOMER",
}

const ROLE_HIERARCHY: Record<string, number> = {
  SUPER_ADMIN: 50,
  AGENCY_STAFF: 40,
  CLIENT_ADMIN: 30,
  CLIENT_STAFF: 20,
  CUSTOMER: 10,
};

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new AppError(ERROR_CODES.UNAUTHORIZED, "Unauthorized", 401);
  }
  return session.user;
}

export async function requireRole(minimumRole: string) {
  const user = await requireAuth();
  
  const userRoleLevel = ROLE_HIERARCHY[user.role] || 0;
  const minimumRoleLevel = ROLE_HIERARCHY[minimumRole] || 0;

  if (userRoleLevel < minimumRoleLevel) {
    throw new AppError(ERROR_CODES.FORBIDDEN, "Forbidden: Insufficient role", 403);
  }

  return user;
}
