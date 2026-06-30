import { AppError } from "./app-error";

export function handleError(error: unknown): never {
  if (error instanceof AppError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new AppError(error.message);
  }

  throw new AppError("An unknown error occurred");
}
