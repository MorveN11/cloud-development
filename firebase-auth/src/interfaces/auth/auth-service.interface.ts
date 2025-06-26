import type { AuthProviderType } from '@/providers/auth.providers';
import type { ApiResponse } from '@/types/api.types';
import type { User } from '@/types/auth.types';

export interface IAuthService {
  register(email: string, password: string, displayName: string): Promise<ApiResponse<User>>;

  login(email: string, password: string): Promise<ApiResponse<User>>;
  loginWithProvider(providerId: AuthProviderType): Promise<ApiResponse<User>>;

  logout(): Promise<ApiResponse>;

  onAuthStateChanged(
    callback: (
      user: {
        uid: string;
        email: string | null;
        displayName: string | null;
        providerData: { providerId: string }[];
      } | null,
    ) => void,
  ): () => void;

  linkWithProvider(providerId: AuthProviderType): Promise<ApiResponse<User>>;
  linkWithPassword(email: string, password: string): Promise<ApiResponse<User>>;
}
