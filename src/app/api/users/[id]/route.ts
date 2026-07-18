import { NextRequest } from "next/server";
import { userController } from "@/server/controllers/user.controller";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  return userController.updateUserRole(req, { params: resolvedParams });
}
