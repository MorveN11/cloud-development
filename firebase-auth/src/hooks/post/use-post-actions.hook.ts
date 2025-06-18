import { useCallback } from 'react';

import { useRepositories } from '@/contexts/repositories.context';
import type { IPostActions } from '@/interfaces/post/post-actions.interface';
import { handleUserAsyncAction } from '@/lib/action.utils';
import type { CreatePostData, Post } from '@/types/post.types';

export const usePostActions = (): IPostActions => {
  const { postRepository } = useRepositories();

  const createPost = useCallback(
    async (userId: string, userEmail: string, postData: CreatePostData): Promise<Post | null> => {
      return handleUserAsyncAction(
        () => postRepository.create(userId, userEmail, postData),
        'Post created successfully',
      );
    },
    [postRepository],
  );

  const getUserPosts = useCallback(
    async (userId: string, showError: boolean = true): Promise<Post[]> => {
      const result = await handleUserAsyncAction(() => postRepository.getUserPosts(userId), undefined, showError);

      return Array.isArray(result) ? result : [];
    },
    [postRepository],
  );

  const deletePost = useCallback(
    async (postId: string): Promise<boolean> => {
      const result = await handleUserAsyncAction(() => postRepository.delete(postId), 'Post deleted successfully');

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
