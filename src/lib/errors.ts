export class AppError extends Error {
  public code: string;
  public status: number;
  public details?: any;

  constructor(
    code: string,
    message: string,
    status: number = 400,
    details?: any
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  RATE_LIMITED: "RATE_LIMITED",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  PAYMENT_FAILED: "PAYMENT_FAILED",
} as const;

export function handleApiError(error: unknown) {
  console.error("[API Error]", error);

  if (error instanceof AppError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
      status: error.status,
    };
  }

  // Handle Zod errors, Prisma errors, etc. here if needed.

  return {
    success: false,
    error: {
      code: ERROR_CODES.INTERNAL_ERROR,
      message: "An unexpected error occurred",
    },
    status: 500,
  };
}
