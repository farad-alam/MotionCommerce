import { NextResponse } from "next/server";
import { AppError, handleApiError } from "./errors";

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function errorResponse(error: unknown) {
  const handledError = handleApiError(error);
  return NextResponse.json(
    {
      success: handledError.success,
      error: handledError.error,
    },
    { status: handledError.status }
  );
}

export function paginatedResponse<T>(
  data: T[],
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  }
) {
  return NextResponse.json({
    success: true,
    data,
    pagination,
  });
}
