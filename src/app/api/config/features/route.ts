export const dynamic = 'force-dynamic'
import { NextRequest } from "next/server";
import { configController } from "@/server/controllers/config.controller";
import { configService } from "@/server/services/config.service";
import { successResponse } from "@/lib/api-response";

export async function GET() {
  const config = await configService.getFeatureFlags();
  return successResponse(config);
}

export async function PATCH(req: NextRequest) {
  return configController.updateFeatureFlags(req);
}
