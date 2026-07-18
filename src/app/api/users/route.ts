import { NextRequest } from "next/server";
import { userController } from "@/server/controllers/user.controller";

export async function GET(req: NextRequest) {
  return userController.getUsers(req);
}
