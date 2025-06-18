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
    'This email address is already registered. Please use a different email or try signing in.',
  [AuthErrorCode.INVALID_EMAIL]: 'Please enter a valid email address.',
  [AuthErrorCode.INVALID_CREDENTIAL]:
    'The email or password is incorrect. Please check your credentials and try again.',
  [AuthErrorCode.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL]:
    'An account with this email already exists. Please sign in with your original method.',
  [AuthErrorCode.CREDENTIALS_ALREADY_IN_USE]: 'This account is already linked with another user.',
  [AuthErrorCode.WEAK_PASSWORD]:
    'Password must be at least 6 characters long and contain a mix of letters and numbers.',
  [AuthErrorCode.USER_NOT_FOUND]:
    'No account found with this email address. Please check your email or create a new account.',
  [AuthErrorCode.WRONG_PASSWORD]: 'Incorrect password. Please try again or reset your password.',
  [AuthErrorCode.TOO_MANY_REQUESTS]: 'Too many failed attempts. Please wait a few minutes before trying again.',
  [AuthErrorCode.NETWORK_ERROR]: 'Network connection failed. Please check your internet connection and try again.',
  [AuthErrorCode.REQUIRES_RECENT_LOGIN]: 'For security reasons, please sign in again to complete this action.',
  [AuthErrorCode.USER_DISABLED]: 'This account has been disabled. Please contact support for assistance.',
  [AuthErrorCode.OPERATION_NOT_ALLOWED]: 'This sign-in method is not enabled. Please contact support.',
  [AuthErrorCode.POPUP_CLOSED_BY_USER]: 'Sign-in was cancelled. Please try again.',
  [AuthErrorCode.POPUP_BLOCKED]: 'Pop-up was blocked by your browser. Please allow pop-ups and try again.',
  [AuthErrorCode.CANCELLED_POPUP_REQUEST]: 'Sign-in request was cancelled. Please try again.',
  [AuthErrorCode.PROVIDER_ALREADY_LINKED]: 'This account is already linked with this provider.',
  [AuthErrorCode.NO_SUCH_PROVIDER]: 'This account is not linked with the requested provider.',
  [AuthErrorCode.USER_DATA_PARSE_ERROR]: 'Failed to process user authentication data. Please try again.',
  [AuthErrorCode.CURRENT_USER_NOT_FOUND]: 'No authenticated user found. Please sign in first.',
  [AuthErrorCode.PROVIDER_NOT_SUPPORTED]: 'This sign-in method is not supported.',
  [AuthErrorCode.LINK_OPERATION_FAILED]: 'Failed to link account. Please try again.',
  [AuthErrorCode.PROFILE_UPDATE_FAILED]: 'Failed to update profile information. Please try again.',
  [AuthErrorCode.VALIDATION_ERROR]: 'Invalid data provided. Please check your information and try again.',
  [AuthErrorCode.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
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
