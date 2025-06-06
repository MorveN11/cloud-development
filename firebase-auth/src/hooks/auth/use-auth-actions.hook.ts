import { useAuth } from '@/contexts/auth.context';
import type { AuthProviderType } from '@/providers/auth.providers';
import type { LinkFormValues, LoginFormValues, RegisterFormValues } from '@/types/auth.types';

import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useAuthActions = () => {
  const navigate = useNavigate();

  const { loginWithProvider, login, linkWithProvider, linkWithPassword, register } = useAuth();

  const handleLogin = async (data: LoginFormValues) => {
    const response = await login(data.email, data.password);

    if (!response.success) {
      toast.error(response.error);

      return;
    }

    toast.success('Login successful');

    navigate('/dashboard');
  };

  const handleLoginWithProvider = async (providerId: AuthProviderType) => {
    if (providerId === 'password') {
      navigate('/link-password');

      return;
    }

    const response = await loginWithProvider(providerId);

    if (!response.success) {
      toast.error(response.error);

      return;
    }

    toast.success('Login successful');

    navigate('/dashboard');
  };
  const { logout } = useAuth();

  const handleLogout = async () => {
    const response = await logout();

    if (!response.success) {
      toast.error(response.error);

      return;
    }

    toast.success('Logout successful');

    navigate('/');
  };

  const handleLinkWithProvider = async (providerId: AuthProviderType) => {
    if (providerId === 'password') {
      navigate('/link-password');

      return;
    }

    const response = await linkWithProvider(providerId);

    if (!response.success) {
      toast.error(response.error);

      return;
    }

    toast.success('Link successful');

    navigate('/dashboard');
  };

  const handleLinkWithPassword = async (data: LinkFormValues) => {
    const response = await linkWithPassword(data.email, data.password);

    if (!response.success) {
      toast.error(response.error);

      return;
    }

    toast.success('Link successful');

    navigate('/dashboard');
  };

  const handleRegister = async (data: RegisterFormValues) => {
    const response = await register(data.email, data.password, data.displayName);

    if (!response.success) {
      toast.error(response.error);

      return;
    }

    toast.success('Register successful');

    navigate('/dashboard');
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
