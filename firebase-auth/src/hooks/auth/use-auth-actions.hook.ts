import { useAuth } from '@/contexts/auth.context';
import { handleAsyncAction } from '@/lib/action.utils';
import type { AuthProviderType } from '@/providers/auth.providers';
import type { LinkPasswordFormValues, LoginFormValues, RegisterFormValues } from '@/types/auth.types';

import { useNavigate } from 'react-router';

export const useAuthActions = () => {
  const navigate = useNavigate();

  const { authService, refreshUser } = useAuth();

  const handleLogin = async (data: LoginFormValues): Promise<void> => {
    await handleAsyncAction(
      () => authService.login(data.email, data.password),
      'Inicio de sesión exitoso',
      true,
      () => {
        navigate('/feed');
      },
    );
  };

  const handleLoginWithProvider = async (providerId: AuthProviderType): Promise<void> => {
    if (providerId === 'password') return;

    await handleAsyncAction(
      () => authService.loginWithProvider(providerId),
      'Inicio de sesión exitoso',
      true,
      () => {
        navigate('/feed');
      },
    );
  };

  const handleLogout = async (): Promise<void> => {
    await handleAsyncAction(() => authService.logout(), 'Sesión cerrada exitosamente', true);
  };

  const handleLinkWithProvider = async (providerId: AuthProviderType): Promise<void> => {
    if (providerId === 'password') {
      navigate('/link-password');
      return;
    }

    await handleAsyncAction(
      () => authService.linkWithProvider(providerId),
      'Cuenta vinculada exitosamente',
      true,
      async () => {
        await refreshUser();
      },
    );
  };

  const handleLinkWithPassword = async (data: LinkPasswordFormValues): Promise<void> => {
    await handleAsyncAction(
      () => authService.linkWithPassword(data.email, data.password),
      'Contraseña vinculada exitosamente',
      true,
      async () => {
        await refreshUser();
        navigate('/user-profile');
      },
    );
  };

  const handleRegister = async (data: RegisterFormValues): Promise<void> => {
    await handleAsyncAction(
      () => authService.register(data.email, data.password, data.displayName),
      'Registro exitoso',
      true,
      async () => {
        await refreshUser();
        navigate('/feed');
      },
    );
  };

  return {
    handleLogin,
    handleLoginWithProvider,
    handleLogout,
    handleLinkWithProvider,
    handleLinkWithPassword,
    handleRegister,
  };
};
