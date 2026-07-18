import { NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";

export class BaseController {
  // Controller pattern foundation
  // Typically handles request extraction, validation trigger, service call, and response formatting
  
  protected success(data: any, status = 200) {
    return successResponse(data, status);
  }

  protected created(data: any) {
    return successResponse(data, 201);
  }

  protected error(error: unknown) {
    return errorResponse(error);
  }
}
