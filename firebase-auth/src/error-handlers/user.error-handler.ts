export const UserErrorCode = {
  USER_NOT_FOUND: 'user/not-found',
  USER_ALREADY_EXISTS: 'user/already-exists',
  INVALID_USER_DATA: 'user/invalid-data',
  UPDATE_FAILED: 'user/update-failed',
  DELETE_FAILED: 'user/delete-failed',
  CREATE_FAILED: 'user/create-failed',
  NETWORK_ERROR: 'user/network-error',
  PERMISSION_DENIED: 'user/permission-denied',
  INVALID_EMAIL: 'user/invalid-email',
  INVALID_UID: 'user/invalid-uid',
  VALIDATION_ERROR: 'user/validation-error',
  DOCUMENT_PARSE_ERROR: 'user/document-parse-error',
} as const;

export type UserErrorCode = (typeof UserErrorCode)[keyof typeof UserErrorCode];

const errorMessages: Record<UserErrorCode, string> = {
  [UserErrorCode.USER_NOT_FOUND]: 'Perfil de usuario no encontrado. Intenta actualizar la página.',
  [UserErrorCode.USER_ALREADY_EXISTS]: 'Ya existe un perfil de usuario con esta información.',
  [UserErrorCode.INVALID_USER_DATA]: 'Información inválida proporcionada. Verifica tus datos e intenta de nuevo.',
  [UserErrorCode.UPDATE_FAILED]: 'Error al actualizar tu perfil. Intenta de nuevo.',
  [UserErrorCode.DELETE_FAILED]: 'Error al eliminar el perfil de usuario. Intenta de nuevo.',
  [UserErrorCode.CREATE_FAILED]: 'Error al crear el perfil de usuario. Intenta de nuevo.',
  [UserErrorCode.NETWORK_ERROR]: 'Falló la conexión de red. Verifica tu conexión a internet e intenta de nuevo.',
  [UserErrorCode.PERMISSION_DENIED]: 'No tienes permisos para realizar esta acción.',
  [UserErrorCode.INVALID_EMAIL]: 'Por favor ingresa una dirección de correo válida.',
  [UserErrorCode.INVALID_UID]: 'Identificador de usuario inválido. Cierra sesión e inicia sesión de nuevo.',
  [UserErrorCode.VALIDATION_ERROR]: 'Verifica tu información e intenta de nuevo.',
  [UserErrorCode.DOCUMENT_PARSE_ERROR]: 'Error al procesar los datos del usuario. Intenta de nuevo.',
};

export interface UserError extends Error {
  code: UserErrorCode | string;
  message: string;
}

export class CustomUserError extends Error implements UserError {
  public code: UserErrorCode;

  constructor(code: UserErrorCode, customMessage?: string) {
    const message = customMessage || errorMessages[code];
    super(message);
    this.name = 'CustomUserError';
    this.code = code;
    this.message = message;
  }
}

export const handleUserError = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return errorMessages[UserErrorCode.VALIDATION_ERROR];
  }

  if (error instanceof CustomUserError) {
    return error.message;
  }

  const userError = error as any;
  const errorCode = userError.code as string;

  const mappedErrorCode = Object.values(UserErrorCode).find((code) => code === errorCode);

  if (mappedErrorCode && errorMessages[mappedErrorCode]) {
    return errorMessages[mappedErrorCode];
  }

  return errorMessages[UserErrorCode.VALIDATION_ERROR];
};
