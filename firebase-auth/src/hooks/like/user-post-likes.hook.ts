import { useState } from 'react';

import { useLikeActions } from '@/hooks/like/use-like-actions.hook';
import type { User } from '@/types/auth.types';
import type { Post } from '@/types/post.types';

import { toast } from 'sonner';

interface Props {
  user: User;
}

export const usePostLikes = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { toggleLikeAction } = useLikeActions({ user });

  const toggleLike = async (post: Post) => {
    setIsLoading(true);

    const newLikeState = await toggleLikeAction(post.id);

    toast.success(
      newLikeState
        ? `Te ha gustado la publicación: ${post.title}`
        : `Has quitado tu me gusta de la publicación: ${post.title}`,
    );

    setIsLoading(false);

    return newLikeState !== null ? newLikeState : false;
  };

  return {
    toggleLike,
    isLoading,
  };
};
