import type { ApiResponse } from '@/types/api.types';

import { toast } from 'sonner';

export const handleResponse = async <T>(
  response: ApiResponse<T>,
  successMessage?: string,
  showError: boolean = true,
  onSuccess?: (data: T) => void,
): Promise<T | null> => {
  if (!response.success) {
    const errorMessage = response.error;

    if (showError) {
      toast.error(errorMessage);
    }

    return response.data;
  }

  if (successMessage) {
    toast.success(successMessage);
  }

  onSuccess?.(response.data);

  return response.data;
};

export const handleAsyncAction = async <T>(
  action: () => Promise<ApiResponse<T>>,
  successMessage?: string,
  showError: boolean = true,
  onSuccess?: (data: T) => void,
): Promise<T | null> => {
  const response = await action();

  return await handleResponse(response, successMessage, showError, onSuccess);
};
