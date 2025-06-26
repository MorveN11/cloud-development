import { useCallback } from 'react';

import { useRepositories } from '@/contexts/repositories.context';
import { handleAsyncAction } from '@/lib/action.utils';
import type { CreateUserProfileDto, UpdateUserProfileDto, UserProfile } from '@/types/user.types';

export const useUserActions = () => {
  const { userRepository } = useRepositories();

  const getUserById = useCallback(
    async (uid: string, showError: boolean): Promise<UserProfile | null> => {
      return handleAsyncAction(() => userRepository.getById(uid), undefined, showError);
    },
    [userRepository],
  );

  const checkUserExists = useCallback(
    async (uid: string, showError: boolean): Promise<boolean> => {
      const result = await handleAsyncAction(() => userRepository.exists(uid), undefined, showError);

      return result === true;
    },
    [userRepository],
  );

  const createUser = async (userData: CreateUserProfileDto): Promise<UserProfile | null> => {
    return handleAsyncAction(() => userRepository.create(userData), 'Usuario creado correctamente');
  };

  const updateUser = async (uid: string, data: UpdateUserProfileDto): Promise<UserProfile | null> => {
    return handleAsyncAction(() => userRepository.update(uid, data), 'Token actualizado correctamente');
  };

  const updateNotificationToken = useCallback(
    async (uid: string, fcmToken: string): Promise<UserProfile | null> => {
      return handleAsyncAction(
        () => userRepository.updateNotificationToken(uid, fcmToken),
        'Tokens actualizados correctamente',
      );
    },
    [userRepository],
  );

  const deleteUser = async (uid: string): Promise<boolean> => {
    const result = await handleAsyncAction(() => userRepository.delete(uid), 'Usuario eliminado correctamente');
    return result !== null;
  };

  return {
    createUser,
    getUserById,
    updateUser,
    updateNotificationToken,
    deleteUser,
    checkUserExists,
  };
};
