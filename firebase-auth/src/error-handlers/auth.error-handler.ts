import { type AuthError } from 'firebase/auth';

export const AuthErrorCode = {
  EMAIL_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  WEAK_PASSWORD: 'auth/weak-password',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  NETWORK_ERROR: 'auth/network-request-failed',
  REQUIRES_RECENT_LOGIN: 'auth/requires-recent-login',
} as const;

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

const errorMessages: Record<AuthErrorCode, string> = {
  [AuthErrorCode.EMAIL_IN_USE]: 'El correo electrónico ya está en uso',
  [AuthErrorCode.INVALID_EMAIL]: 'Correo electrónico inválido',
  [AuthErrorCode.WEAK_PASSWORD]: 'La contraseña es demasiado débil',
  [AuthErrorCode.USER_NOT_FOUND]: 'Correo o contraseña incorrectos',
  [AuthErrorCode.WRONG_PASSWORD]: 'Correo o contraseña incorrectos',
  [AuthErrorCode.TOO_MANY_REQUESTS]: 'Demasiados intentos. Intenta de nuevo más tarde',
  [AuthErrorCode.NETWORK_ERROR]: 'Error de conexión. Verifica tu conexión a internet',
  [AuthErrorCode.REQUIRES_RECENT_LOGIN]:
    'Esta operación requiere autenticación reciente. Por favor, vuelve a iniciar sesión',
};

export const handleAuthError = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return 'Error de autenticación desconocido';
  }

  const authError = error as AuthError;
  const errorCode = authError.code as AuthErrorCode;

  return errorMessages[errorCode] || authError.message || 'Error de autenticación';
};

export interface CustomAuthError extends Error {
  code: AuthErrorCode | string;
  message: string;
}
