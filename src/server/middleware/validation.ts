import { z } from "zod";
import { AppError, ERROR_CODES } from "@/lib/errors";

export async function validateRequest<T>(
  schema: z.Schema<T>,
  data: unknown
): Promise<T> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(
        ERROR_CODES.VALIDATION_ERROR,
        "Validation failed",
        400,
        error.errors
      );
    }
    throw error;
  }
}
