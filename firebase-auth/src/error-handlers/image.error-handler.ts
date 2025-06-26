export const ImageErrorCode = {
  UPLOAD_FAILED: 'image/upload-failed',
  DELETE_FAILED: 'image/delete-failed',
  IMAGE_NOT_FOUND: 'image/not-found',
  INVALID_FILE_TYPE: 'image/invalid-file-type',
  FILE_TOO_LARGE: 'image/file-too-large',
  NETWORK_ERROR: 'image/network-error',
  STORAGE_ERROR: 'image/storage-error',
  PERMISSION_DENIED: 'image/permission-denied',
  UNKNOWN_ERROR: 'image/unknown-error',
  INVALID_IMAGE_FORMAT: 'image/invalid-image-format',
} as const;

export type ImageErrorCode = (typeof ImageErrorCode)[keyof typeof ImageErrorCode];

const errorMessages: Record<ImageErrorCode, string> = {
  [ImageErrorCode.UPLOAD_FAILED]: 'Error al subir la imagen. Inténtalo de nuevo.',
  [ImageErrorCode.DELETE_FAILED]: 'Error al eliminar la imagen. Inténtalo de nuevo.',
  [ImageErrorCode.IMAGE_NOT_FOUND]: 'La imagen no fue encontrada.',
  [ImageErrorCode.INVALID_FILE_TYPE]: 'Tipo de archivo no válido. Solo se permiten imágenes.',
  [ImageErrorCode.FILE_TOO_LARGE]: 'El archivo es demasiado grande. Máximo 5MB.',
  [ImageErrorCode.NETWORK_ERROR]: 'Error de red. Verifica tu conexión a internet.',
  [ImageErrorCode.STORAGE_ERROR]: 'Error en el almacenamiento. Inténtalo más tarde.',
  [ImageErrorCode.PERMISSION_DENIED]: 'No tienes permisos para realizar esta acción.',
  [ImageErrorCode.UNKNOWN_ERROR]: 'Error desconocido. Inténtalo de nuevo.',
  [ImageErrorCode.INVALID_IMAGE_FORMAT]: 'Formato de imagen no válido. Asegúrate de que sea JPEG, PNG o WebP.',
};

export interface CustomImageErrorInterface extends Error {
  code: ImageErrorCode | string;
  message: string;
}

export class CustomImageError extends Error implements CustomImageErrorInterface {
  public code: ImageErrorCode;

  constructor(code: ImageErrorCode, customMessage?: string) {
    const message = customMessage || errorMessages[code];
    super(message);
    this.name = 'CustomImageError';
    this.code = code;
    this.message = message;
  }
}

export function handleImageError(error: unknown): string {
  if (!(error instanceof CustomImageError)) {
    return errorMessages[ImageErrorCode.UNKNOWN_ERROR];
  }

  if (error instanceof CustomImageError) {
    return error.message;
  }

  const errorCode = (error as CustomImageErrorInterface).code;

  const mappedErrorCode = Object.values(ImageErrorCode).find((code) => code === errorCode);

  if (mappedErrorCode && errorMessages[mappedErrorCode]) {
    return errorMessages[mappedErrorCode];
  }

  return errorMessages[ImageErrorCode.UNKNOWN_ERROR];
}
