import { useCallback } from 'react';

import { useRepositories } from '@/contexts/repositories.context';
import { handleAsyncAction } from '@/lib/action.utils';
import type { User } from '@/types/auth.types';

interface Props {
  user: User;
}

export const useLikeActions = ({ user }: Props) => {
  const { likeRepository } = useRepositories();

  const toggleLikeAction = useCallback(
    async (postId: string): Promise<boolean | null> => {
      return handleAsyncAction(() => likeRepository.toggleLike(postId, user.uid), undefined);
    },
    [likeRepository, user.uid],
  );

  return {
    toggleLikeAction,
  };
};
