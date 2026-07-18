export const dynamic = 'force-dynamic';

import { NextRequest } from "next/server";
import { userController } from "@/server/controllers/user.controller";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return userController.getUserById(id);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return userController.updateUserRole(req, id);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return userController.deleteUser(id);
}
