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
} as const;

export type PostErrorCode = (typeof PostErrorCode)[keyof typeof PostErrorCode];

const errorMessages: Record<PostErrorCode, string> = {
  [PostErrorCode.POST_NOT_FOUND]: 'Post not found. It may have been deleted.',
  [PostErrorCode.POST_ALREADY_EXISTS]: 'A post with this information already exists.',
  [PostErrorCode.INVALID_POST_DATA]: 'Invalid post data provided. Please check your input.',
  [PostErrorCode.CREATE_FAILED]: 'Failed to create post. Please try again.',
  [PostErrorCode.UPDATE_FAILED]: 'Failed to update post. Please try again.',
  [PostErrorCode.DELETE_FAILED]: 'Failed to delete post. Please try again.',
  [PostErrorCode.NETWORK_ERROR]: 'Network connection failed. Please check your internet connection and try again.',
  [PostErrorCode.PERMISSION_DENIED]: 'You do not have permission to perform this action.',
  [PostErrorCode.VALIDATION_ERROR]: 'Please check your post information and try again.',
  [PostErrorCode.DOCUMENT_PARSE_ERROR]: 'Failed to process post data. Please try again.',
  [PostErrorCode.UNAUTHORIZED_ACCESS]: 'You are not authorized to access this post.',
  [PostErrorCode.IMAGE_UPLOAD_FAILED]: 'Failed to upload image for the post. Please try again.',
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
