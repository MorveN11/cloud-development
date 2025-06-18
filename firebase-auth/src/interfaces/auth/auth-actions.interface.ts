import type { AuthProviderType } from '@/providers/auth.providers';
import type { LinkPasswordFormValues, LoginFormValues, RegisterFormValues } from '@/types/auth.types';

export interface IAuthActions {
  handleLogin(data: LoginFormValues): Promise<void>;
  handleLoginWithProvider(providerId: AuthProviderType): Promise<void>;
  handleLogout(): Promise<void>;
  handleLinkWithProvider(providerId: AuthProviderType): Promise<void>;
  handleLinkWithPassword(data: LinkPasswordFormValues): Promise<void>;
  handleRegister(data: RegisterFormValues): Promise<void>;
}
