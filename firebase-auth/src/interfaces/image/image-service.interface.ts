import type { ApiResponse } from '@/types/api.types';
import type { ImageUploadResult } from '@/types/image.types';

export interface IImageService {
  uploadImage(file: File): Promise<ApiResponse<ImageUploadResult>>;
  deleteImage(imageId: string): Promise<ApiResponse<boolean>>;
}
