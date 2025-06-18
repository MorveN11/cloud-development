import { useCallback } from 'react';

import { useRepositories } from '@/contexts/repositories.context';
import type { IUserActions } from '@/interfaces/user/user-actions.interface';
import { handleUserAsyncAction } from '@/lib/action.utils';
import type { CreateUserProfileDto, UpdateUserProfileDto, UserProfile } from '@/types/user.types';

export const useUserActions = (): IUserActions => {
  const { userRepository } = useRepositories();

  const getUserById = useCallback(
    async (uid: string, showError: boolean): Promise<UserProfile | null> => {
      return handleUserAsyncAction(() => userRepository.getById(uid), undefined, showError);
    },
    [userRepository],
  );

  const checkUserExists = useCallback(
    async (uid: string, showError: boolean): Promise<boolean> => {
      const result = await handleUserAsyncAction(() => userRepository.exists(uid), undefined, showError);

      return result === true;
    },
    [userRepository],
  );

  const createUser = async (userData: CreateUserProfileDto): Promise<UserProfile | null> => {
    return handleUserAsyncAction(() => userRepository.create(userData), 'User created successfully');
  };

  const updateUser = async (uid: string, data: UpdateUserProfileDto): Promise<UserProfile | null> => {
    return handleUserAsyncAction(() => userRepository.update(uid, data), 'User updated successfully');
  };

  const deleteUser = async (uid: string): Promise<boolean> => {
    const result = await handleUserAsyncAction(() => userRepository.delete(uid), 'User deleted successfully');
    return result !== null;
  };

  return {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    checkUserExists,
  };
};
