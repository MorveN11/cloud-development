import { storage } from '@/apps/firebase.app';
import { CustomImageError, ImageErrorCode, handleImageError } from '@/error-handlers/image.error-handler';
import type { IImageService } from '@/interfaces/image/image-service.interface';
import { generateImageId } from '@/lib/image.utils';
import { imageUploadResultSchema } from '@/schemas/image.schemas';
import { errorResponse, successResponse, type ApiResponse } from '@/types/api.types';
import type { ImageUploadResult } from '@/types/image.types';

import { deleteObject, getDownloadURL, ref, uploadBytes, type UploadResult } from 'firebase/storage';

class ImageService implements IImageService {
  private readonly storagePath = 'images';
  private readonly maxFileSize = 5 * 1024 * 1024;
  private readonly allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

  public async uploadImage(file: File): Promise<ApiResponse<ImageUploadResult>> {
    try {
      if (!this.allowedTypes.includes(file.type)) {
        throw new CustomImageError(ImageErrorCode.INVALID_FILE_TYPE);
      }

      if (file.size > this.maxFileSize) {
        throw new CustomImageError(ImageErrorCode.FILE_TOO_LARGE);
      }

      const fileName = `${generateImageId()}_${file.name}`;

      const imageRef = ref(storage, `${this.storagePath}/${fileName}`);

      const uploadResult: UploadResult = await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(uploadResult.ref);

      const result = imageUploadResultSchema.safeParse({
        name: fileName,
        url: downloadURL,
        fileSize: file.size,
        uploadedAt: new Date(),
      });

      if (!result.success) {
        await deleteObject(imageRef);

        throw new CustomImageError(ImageErrorCode.UPLOAD_FAILED);
      }

      return successResponse(result.data);
    } catch (error) {
      return errorResponse(handleImageError(error));
    }
  }

  public async deleteImage(imageName: string): Promise<ApiResponse<boolean>> {
    try {
      const imageRef = ref(storage, `${this.storagePath}/${imageName}`);

      await deleteObject(imageRef);

      return successResponse(true);
    } catch (error) {
      return errorResponse(handleImageError(error));
    }
  }
}

export const imageService = new ImageService();
