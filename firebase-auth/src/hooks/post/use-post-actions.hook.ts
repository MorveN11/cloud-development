import { useCallback } from 'react';

import { useRepositories } from '@/contexts/repositories.context';
import { handleAsyncAction } from '@/lib/action.utils';
import type { CreatePostData, Post } from '@/types/post.types';

export const usePostActions = () => {
  const { postRepository } = useRepositories();

  const createPost = useCallback(
    async (
      userId: string,
      userDisplayName: string,
      userEmail: string,
      postData: CreatePostData,
    ): Promise<Post | null> => {
      return handleAsyncAction(
        () => postRepository.create(userId, userDisplayName, userEmail, postData),
        'Publicación creada correctamente',
      );
    },
    [postRepository],
  );

  const getUserPosts = useCallback(
    async (userId: string | undefined, showError: boolean = true): Promise<Post[]> => {
      const result = await handleAsyncAction(() => postRepository.getUserPosts(userId), undefined, showError);

      return Array.isArray(result) ? result : [];
    },
    [postRepository],
  );

  const deletePost = useCallback(
    async (postId: string): Promise<boolean> => {
      const result = await handleAsyncAction(
        () => postRepository.delete(postId),
        'Publicación eliminada correctamente',
      );

      return result !== null;
    },
    [postRepository],
  );

  return {
    createPost,
    getUserPosts,
    deletePost,
  };
};
