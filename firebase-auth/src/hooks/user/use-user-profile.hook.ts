import { useCallback, useEffect, useState } from 'react';

import { useUserActions } from '@/hooks/user/use-user-actions.hook';
import type { User } from '@/types/auth.types';
import type { UserProfile } from '@/types/user.types';

interface Props {
  user: User;
  showError?: boolean;
}

export const useUserProfile = ({ user, showError = false }: Props) => {
  const { getUserById } = useUserActions();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const profile = await getUserById(user.uid, showError);

      setUserProfile(profile);
    } catch {
      setError('Error al cargar el perfil del usuario');
    } finally {
      setLoading(false);
    }
  }, [user.uid, showError, getUserById]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return {
    userProfile,
    loading,
    error,
    fetchUserProfile,
  };
};
