export const AuthErrorCode = {
  EMAIL_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  INVALID_CREDENTIAL: 'auth/invalid-credential',
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL: 'auth/account-exists-with-different-credential',
  CREDENTIALS_ALREADY_IN_USE: 'auth/credential-already-in-use',
  WEAK_PASSWORD: 'auth/weak-password',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  NETWORK_ERROR: 'auth/network-request-failed',
  REQUIRES_RECENT_LOGIN: 'auth/requires-recent-login',
  USER_DISABLED: 'auth/user-disabled',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  POPUP_CLOSED_BY_USER: 'auth/popup-closed-by-user',
  POPUP_BLOCKED: 'auth/popup-blocked',
  CANCELLED_POPUP_REQUEST: 'auth/cancelled-popup-request',
  PROVIDER_ALREADY_LINKED: 'auth/provider-already-linked',
  NO_SUCH_PROVIDER: 'auth/no-such-provider',
  USER_DATA_PARSE_ERROR: 'auth/user-data-parse-error',
  CURRENT_USER_NOT_FOUND: 'auth/current-user-not-found',
  PROVIDER_NOT_SUPPORTED: 'auth/provider-not-supported',
  LINK_OPERATION_FAILED: 'auth/link-operation-failed',
  PROFILE_UPDATE_FAILED: 'auth/profile-update-failed',
  VALIDATION_ERROR: 'auth/validation-error',
  UNKNOWN_ERROR: 'auth/unknown-error',
} as const;

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

const errorMessages: Record<AuthErrorCode, string> = {
  [AuthErrorCode.EMAIL_IN_USE]:
    'Esta dirección de correo ya está registrada. Por favor usa un correo diferente o intenta iniciar sesión.',
  [AuthErrorCode.INVALID_EMAIL]: 'Por favor ingresa una dirección de correo válida.',
  [AuthErrorCode.INVALID_CREDENTIAL]:
    'El correo o la contraseña son incorrectos. Por favor verifica tus credenciales e intenta de nuevo.',
  [AuthErrorCode.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL]:
    'Ya existe una cuenta con este correo. Por favor inicia sesión con tu método original.',
  [AuthErrorCode.CREDENTIALS_ALREADY_IN_USE]: 'Esta cuenta ya está vinculada con otro usuario.',
  [AuthErrorCode.WEAK_PASSWORD]:
    'La contraseña debe tener al menos 6 caracteres y contener una mezcla de letras y números.',
  [AuthErrorCode.USER_NOT_FOUND]:
    'No se encontró ninguna cuenta con este correo electrónico. Verifica tu correo o crea una cuenta nueva.',
  [AuthErrorCode.WRONG_PASSWORD]: 'Contraseña incorrecta. Intenta de nuevo o restablece tu contraseña.',
  [AuthErrorCode.TOO_MANY_REQUESTS]: 'Demasiados intentos fallidos. Espera unos minutos antes de intentar de nuevo.',
  [AuthErrorCode.NETWORK_ERROR]: 'Falló la conexión de red. Verifica tu conexión a internet e intenta de nuevo.',
  [AuthErrorCode.REQUIRES_RECENT_LOGIN]: 'Por razones de seguridad, inicia sesión de nuevo para completar esta acción.',
  [AuthErrorCode.USER_DISABLED]: 'Esta cuenta ha sido deshabilitada. Contacta a soporte para asistencia.',
  [AuthErrorCode.OPERATION_NOT_ALLOWED]: 'Este método de inicio de sesión no está habilitado. Contacta a soporte.',
  [AuthErrorCode.POPUP_CLOSED_BY_USER]: 'El inicio de sesión fue cancelado. Intenta de nuevo.',
  [AuthErrorCode.POPUP_BLOCKED]:
    'La ventana emergente fue bloqueada por tu navegador. Permite ventanas emergentes e intenta de nuevo.',
  [AuthErrorCode.CANCELLED_POPUP_REQUEST]: 'La solicitud de inicio de sesión fue cancelada. Intenta de nuevo.',
  [AuthErrorCode.PROVIDER_ALREADY_LINKED]: 'Esta cuenta ya está vinculada con este proveedor.',
  [AuthErrorCode.NO_SUCH_PROVIDER]: 'Esta cuenta no está vinculada con el proveedor solicitado.',
  [AuthErrorCode.USER_DATA_PARSE_ERROR]: 'Error al procesar los datos de autenticación del usuario. Intenta de nuevo.',
  [AuthErrorCode.CURRENT_USER_NOT_FOUND]: 'No se encontró usuario autenticado. Inicia sesión primero.',
  [AuthErrorCode.PROVIDER_NOT_SUPPORTED]: 'Este método de inicio de sesión no es compatible.',
  [AuthErrorCode.LINK_OPERATION_FAILED]: 'Error al vincular la cuenta. Intenta de nuevo.',
  [AuthErrorCode.PROFILE_UPDATE_FAILED]: 'Error al actualizar la información del perfil. Intenta de nuevo.',
  [AuthErrorCode.VALIDATION_ERROR]: 'Datos inválidos proporcionados. Verifica tu información e intenta de nuevo.',
  [AuthErrorCode.UNKNOWN_ERROR]: 'Ocurrió un error inesperado. Intenta de nuevo.',
};

export interface CustomAuthErrorInterface extends Error {
  code: AuthErrorCode | string;
  message: string;
}

export class CustomAuthError extends Error implements CustomAuthErrorInterface {
  public code: AuthErrorCode;

  constructor(code: AuthErrorCode, customMessage?: string) {
    const message = customMessage || errorMessages[code];
    super(message);
    this.name = 'CustomAuthError';
    this.code = code;
    this.message = message;
  }
}

export const handleAuthError = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return errorMessages[AuthErrorCode.UNKNOWN_ERROR];
  }

  if (error instanceof CustomAuthError) {
    return error.message;
  }

  const firebaseError = error as any;
  const errorCode = firebaseError.code as string;

  const mappedErrorCode = Object.values(AuthErrorCode).find((code) => code === errorCode);

  if (mappedErrorCode && errorMessages[mappedErrorCode]) {
    return errorMessages[mappedErrorCode];
  }

  return errorMessages[AuthErrorCode.UNKNOWN_ERROR];
};
