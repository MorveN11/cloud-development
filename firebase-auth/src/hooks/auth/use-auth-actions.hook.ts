import { startTransition } from 'react';

import { useAuth } from '@/contexts/auth.context';
import type { IAuthActions } from '@/interfaces/auth/auth-actions.interface';
import { handleAuthAsyncAction } from '@/lib/action.utils';
import type { AuthProviderType } from '@/providers/auth.providers';
import type { LinkPasswordFormValues, LoginFormValues, RegisterFormValues } from '@/types/auth.types';

import { useNavigate } from 'react-router';

export const useAuthActions = (): IAuthActions => {
  const navigate = useNavigate();

  const { authService, refreshUser } = useAuth();

  const handleLogin = async (data: LoginFormValues): Promise<void> => {
    await handleAuthAsyncAction(
      () => authService.login(data.email, data.password),
      'Login successful',
      true,
      () => {
        startTransition(() => {
          navigate('/dashboard');
        });
      },
    );
  };

  const handleLoginWithProvider = async (providerId: AuthProviderType): Promise<void> => {
    if (providerId === 'password') {
      startTransition(() => {
        navigate('/link-password');
      });
      return;
    }

    await handleAuthAsyncAction(
      () => authService.loginWithProvider(providerId),
      'Login successful',
      true,
      () => {
        startTransition(() => {
          navigate('/dashboard');
        });
      },
    );
  };

  const handleLogout = async (): Promise<void> => {
    await handleAuthAsyncAction(
      () => authService.logout(),
      'Logout successful',
      true,
      () => {
        startTransition(() => {
          navigate('/');
        });
      },
    );
  };

  const handleLinkWithProvider = async (providerId: AuthProviderType): Promise<void> => {
    if (providerId === 'password') {
      startTransition(() => {
        navigate('/link-password');
      });
      return;
    }

    await handleAuthAsyncAction(
      () => authService.linkWithProvider(providerId),
      'Account linked successfully',
      true,
      async () => {
        await refreshUser();
      },
    );
  };

  const handleLinkWithPassword = async (data: LinkPasswordFormValues): Promise<void> => {
    await handleAuthAsyncAction(
      () => authService.linkWithPassword(data.email, data.password),
      'Password linked successfully',
      true,
      () => {
        startTransition(async () => {
          await refreshUser();
          navigate('/dashboard');
        });
      },
    );
  };

  const handleRegister = async (data: RegisterFormValues): Promise<void> => {
    await handleAuthAsyncAction(
      () => authService.register(data.email, data.password, data.displayName),
      'Registration successful',
      true,
      async () => {
        startTransition(async () => {
          await refreshUser();
          navigate('/dashboard');
        });
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
