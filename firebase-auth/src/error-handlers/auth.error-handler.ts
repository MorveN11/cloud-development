import { type AuthError } from 'firebase/auth';

export const AuthErrorCode = {
  EMAIL_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  INVALID_CREDENTIAL: 'auth/invalid-credential',
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL: 'auth/account-exists-with-different-credential',
  CREDENTIALS_ALREADY_IN_USE: 'auth/credentials-already-in-use',
  WEAK_PASSWORD: 'auth/weak-password',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  NETWORK_ERROR: 'auth/network-request-failed',
  REQUIRES_RECENT_LOGIN: 'auth/requires-recent-login',
} as const;

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

const errorMessages: Record<AuthErrorCode, string> = {
  [AuthErrorCode.EMAIL_IN_USE]: 'The email address is already in use by another account.',
  [AuthErrorCode.INVALID_EMAIL]: 'The email address is invalid.',
  [AuthErrorCode.INVALID_CREDENTIAL]: 'The email address is invalid.',
  [AuthErrorCode.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL]:
    'An account already exists with the same email address but different sign-in credentials.',
  [AuthErrorCode.CREDENTIALS_ALREADY_IN_USE]: 'The credentials already in use.',
  [AuthErrorCode.WEAK_PASSWORD]: 'The password is invalid or the password is less than 6 characters.',
  [AuthErrorCode.USER_NOT_FOUND]: 'User not found',
  [AuthErrorCode.WRONG_PASSWORD]: 'The password is invalid or the password is less than 6 characters.',
  [AuthErrorCode.TOO_MANY_REQUESTS]: 'Too many requests. Try again later',
  [AuthErrorCode.NETWORK_ERROR]: 'A network error occurred. Please try again later.',
  [AuthErrorCode.REQUIRES_RECENT_LOGIN]:
    'This operation requires recent authentication. Please reauthenticate and try again.',
};

export const handleAuthError = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return 'Unknown authentication error';
  }

  const authError = error as AuthError;
  const errorCode = authError.code as AuthErrorCode;

  return errorMessages[errorCode] || 'Unknown authentication error';
};

export interface CustomAuthError extends Error {
  code: AuthErrorCode | string;
  message: string;
}
