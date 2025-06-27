export const LikeErrorCode = {
  LIKE_NOT_FOUND: 'like/not-found',
  LIKE_ALREADY_EXISTS: 'like/already-exists',
  INVALID_LIKE_DATA: 'like/invalid-data',
  TOGGLE_FAILED: 'like/toggle-failed',
  CREATE_FAILED: 'like/create-failed',
  DELETE_FAILED: 'like/delete-failed',
  NETWORK_ERROR: 'like/network-error',
  PERMISSION_DENIED: 'like/permission-denied',
  VALIDATION_ERROR: 'like/validation-error',
  DOCUMENT_PARSE_ERROR: 'like/document-parse-error',
  UNAUTHORIZED_ACCESS: 'like/unauthorized-access',
  TRANSACTION_FAILED: 'like/transaction-failed',
  POST_NOT_FOUND: 'like/post-not-found',
  USER_NOT_FOUND: 'like/user-not-found',
  LIKES_FETCH_FAILED: 'like/likes-fetch-failed',
  COUNT_UPDATE_FAILED: 'like/count-update-failed',
  DUPLICATE_OPERATION: 'like/duplicate-operation',
} as const;

export type LikeErrorCode = (typeof LikeErrorCode)[keyof typeof LikeErrorCode];

const errorMessages: Record<LikeErrorCode, string> = {
  [LikeErrorCode.LIKE_NOT_FOUND]: 'Me gusta no encontrado. Puede haber sido eliminado.',
  [LikeErrorCode.LIKE_ALREADY_EXISTS]: 'Ya has dado me gusta a esta publicación.',
  [LikeErrorCode.INVALID_LIKE_DATA]: 'Datos de me gusta inválidos. Verifica tu entrada.',
  [LikeErrorCode.TOGGLE_FAILED]: 'Error al procesar me gusta. Intenta de nuevo.',
  [LikeErrorCode.CREATE_FAILED]: 'Error al crear me gusta. Intenta de nuevo.',
  [LikeErrorCode.DELETE_FAILED]: 'Error al eliminar me gusta. Intenta de nuevo.',
  [LikeErrorCode.NETWORK_ERROR]: 'Falló la conexión de red. Verifica tu conexión a internet e intenta de nuevo.',
  [LikeErrorCode.PERMISSION_DENIED]: 'No tienes permisos para dar me gusta a esta publicación.',
  [LikeErrorCode.VALIDATION_ERROR]: 'Verifica la información e intenta de nuevo.',
  [LikeErrorCode.DOCUMENT_PARSE_ERROR]: 'Error al procesar los datos de me gusta. Intenta de nuevo.',
  [LikeErrorCode.UNAUTHORIZED_ACCESS]: 'No tienes autorización para acceder a esta funcionalidad.',
  [LikeErrorCode.TRANSACTION_FAILED]: 'Error en la transacción. Intenta de nuevo.',
  [LikeErrorCode.POST_NOT_FOUND]: 'Publicación no encontrada para dar me gusta.',
  [LikeErrorCode.USER_NOT_FOUND]: 'Usuario no encontrado para procesar me gusta.',
  [LikeErrorCode.LIKES_FETCH_FAILED]: 'Error al obtener los me gusta. Intenta de nuevo.',
  [LikeErrorCode.COUNT_UPDATE_FAILED]: 'Error al actualizar el contador de me gusta.',
  [LikeErrorCode.DUPLICATE_OPERATION]: 'Operación duplicada detectada. Espera un momento e intenta de nuevo.',
};

export interface LikeError extends Error {
  code: LikeErrorCode | string;
  message: string;
}

export class CustomLikeError extends Error implements LikeError {
  public code: LikeErrorCode;

  constructor(code: LikeErrorCode, customMessage?: string) {
    const message = customMessage || errorMessages[code];
    super(message);
    this.name = 'CustomLikeError';
    this.code = code;
    this.message = message;
  }
}

export const handleLikeError = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return errorMessages[LikeErrorCode.VALIDATION_ERROR];
  }

  if (error instanceof CustomLikeError) {
    return error.message;
  }

  const likeError = error as any;
  const errorCode = likeError.code as string;

  const mappedErrorCode = Object.values(LikeErrorCode).find((code) => code === errorCode);

  if (mappedErrorCode && errorMessages[mappedErrorCode]) {
    return errorMessages[mappedErrorCode];
  }

  return errorMessages[LikeErrorCode.VALIDATION_ERROR];
};
