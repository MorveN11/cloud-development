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
  [UserErrorCode.USER_NOT_FOUND]: 'User profile not found. Please try refreshing the page.',
  [UserErrorCode.USER_ALREADY_EXISTS]: 'A user profile already exists with this information.',
  [UserErrorCode.INVALID_USER_DATA]: 'Invalid information provided. Please check your data and try again.',
  [UserErrorCode.UPDATE_FAILED]: 'Failed to update your profile. Please try again.',
  [UserErrorCode.DELETE_FAILED]: 'Failed to delete user profile. Please try again.',
  [UserErrorCode.CREATE_FAILED]: 'Failed to create user profile. Please try again.',
  [UserErrorCode.NETWORK_ERROR]: 'Network connection failed. Please check your internet connection and try again.',
  [UserErrorCode.PERMISSION_DENIED]: 'You do not have permission to perform this action.',
  [UserErrorCode.INVALID_EMAIL]: 'Please enter a valid email address.',
  [UserErrorCode.INVALID_UID]: 'Invalid user identifier. Please sign out and sign in again.',
  [UserErrorCode.VALIDATION_ERROR]: 'Please check your information and try again.',
  [UserErrorCode.DOCUMENT_PARSE_ERROR]: 'Failed to process user data. Please try again.',
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
