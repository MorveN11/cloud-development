export type SuccessResponse<T> = {
  data: T;
  error: null;
  success: true;
};

export type ErrorResponse = {
  data: null;
  error: string;
  success: false;
};

export type ApiResponse<T = void> = SuccessResponse<T> | ErrorResponse;

export function successResponse(): SuccessResponse<void>;
export function successResponse<T>(data: T): SuccessResponse<T>;
export function successResponse<T>(data?: T): SuccessResponse<T> | SuccessResponse<void> {
  if (arguments.length === 0) {
    return {
      data: undefined,
      error: null,
      success: true,
    } as SuccessResponse<void>;
  }

  return {
    data: data as T,
    error: null,
    success: true,
  };
}

export const errorResponse = (error: string): ErrorResponse => ({
  data: null,
  error,
  success: false,
});
