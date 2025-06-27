import { useCallback } from 'react';

import { useRepositories } from '@/contexts/repositories.context';
import { handleAsyncAction } from '@/lib/action.utils';
import type { CreatePostData, Post, PostWithLikes } from '@/types/post.types';

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

  const getPosts = useCallback(
    async (userId: string | undefined, showError: boolean = true): Promise<Post[]> => {
      const result = await handleAsyncAction(() => postRepository.getPosts(userId), undefined, showError);

      return Array.isArray(result) ? result : [];
    },
    [postRepository],
  );

  const getPostsWithLikes = useCallback(
    async (userId?: string, authorUID?: string, showError: boolean = true): Promise<PostWithLikes[]> => {
      const result = await handleAsyncAction(
        () => postRepository.getPostsWithLikes(userId, authorUID),
        undefined,
        showError,
      );

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
    getUserPosts: getPosts,
    getPostsWithLikes,
    deletePost,
  };
};
