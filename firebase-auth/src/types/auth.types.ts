import type { ApiResponse } from '@/types/api.types';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
}

export type AuthResponse = ApiResponse<User>;
