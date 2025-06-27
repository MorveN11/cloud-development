export const PostErrorCode = {
  POST_NOT_FOUND: 'post/not-found',
  POST_ALREADY_EXISTS: 'post/already-exists',
  INVALID_POST_DATA: 'post/invalid-data',
  CREATE_FAILED: 'post/create-failed',
  UPDATE_FAILED: 'post/update-failed',
  DELETE_FAILED: 'post/delete-failed',
  NETWORK_ERROR: 'post/network-error',
  PERMISSION_DENIED: 'post/permission-denied',
  VALIDATION_ERROR: 'post/validation-error',
  DOCUMENT_PARSE_ERROR: 'post/document-parse-error',
  UNAUTHORIZED_ACCESS: 'post/unauthorized-access',
  IMAGE_UPLOAD_FAILED: 'post/image-upload-failed',
  POSTS_NOT_FOUND: 'post/posts-not-found',
} as const;

export type PostErrorCode = (typeof PostErrorCode)[keyof typeof PostErrorCode];

const errorMessages: Record<PostErrorCode, string> = {
  [PostErrorCode.POST_NOT_FOUND]: 'Publicación no encontrada. Puede haber sido eliminada.',
  [PostErrorCode.POST_ALREADY_EXISTS]: 'Ya existe una publicación con esta información.',
  [PostErrorCode.INVALID_POST_DATA]: 'Datos de publicación inválidos. Verifica tu entrada.',
  [PostErrorCode.CREATE_FAILED]: 'Error al crear la publicación. Intenta de nuevo.',
  [PostErrorCode.UPDATE_FAILED]: 'Error al actualizar la publicación. Intenta de nuevo.',
  [PostErrorCode.DELETE_FAILED]: 'Error al eliminar la publicación. Intenta de nuevo.',
  [PostErrorCode.NETWORK_ERROR]: 'Falló la conexión de red. Verifica tu conexión a internet e intenta de nuevo.',
  [PostErrorCode.PERMISSION_DENIED]: 'No tienes permisos para realizar esta acción.',
  [PostErrorCode.VALIDATION_ERROR]: 'Verifica la información de tu publicación e intenta de nuevo.',
  [PostErrorCode.DOCUMENT_PARSE_ERROR]: 'Error al procesar los datos de la publicación. Intenta de nuevo.',
  [PostErrorCode.UNAUTHORIZED_ACCESS]: 'No tienes autorización para acceder a esta publicación.',
  [PostErrorCode.IMAGE_UPLOAD_FAILED]: 'Error al subir la imagen de la publicación. Intenta de nuevo.',
  [PostErrorCode.POSTS_NOT_FOUND]:
    'No se encontraron publicaciones. Puede que no existan o que no tengas acceso a ellas.',
};

export interface PostError extends Error {
  code: PostErrorCode | string;
  message: string;
}

export class CustomPostError extends Error implements PostError {
  public code: PostErrorCode;

  constructor(code: PostErrorCode, customMessage?: string) {
    const message = customMessage || errorMessages[code];
    super(message);
    this.name = 'CustomPostError';
    this.code = code;
    this.message = message;
  }
}

export const handlePostError = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return errorMessages[PostErrorCode.VALIDATION_ERROR];
  }

  if (error instanceof CustomPostError) {
    return error.message;
  }

  const postError = error as any;
  const errorCode = postError.code as string;

  const mappedErrorCode = Object.values(PostErrorCode).find((code) => code === errorCode);

  if (mappedErrorCode && errorMessages[mappedErrorCode]) {
    return errorMessages[mappedErrorCode];
  }

  return errorMessages[PostErrorCode.VALIDATION_ERROR];
};
