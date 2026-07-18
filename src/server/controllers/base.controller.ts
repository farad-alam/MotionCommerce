import { NextResponse } from "next/server";
import { handleApiError, successResponse } from "@/lib/api-response";

export class BaseController {
  // Controller pattern foundation
  // Typically handles request extraction, validation trigger, service call, and response formatting
  
  protected success(data: any, status = 200) {
    return successResponse(data, status);
  }

  protected error(error: unknown) {
    return handleApiError(error);
  }
}
