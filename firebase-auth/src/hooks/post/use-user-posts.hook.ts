import { useCallback, useEffect, useState } from 'react';

import { usePostActions } from '@/hooks/post/use-post-actions.hook';
import type { CreatePostData, Post } from '@/types/post.types';
import type { UserProfile } from '@/types/user.types';

interface Props {
  user: UserProfile;
  showError?: boolean;
  autoLoad?: boolean;
  allPosts?: boolean;
}

export const useUserPosts = ({ user, showError = true, autoLoad = true, allPosts = false }: Props) => {
  const { getUserPosts, createPost, deletePost } = usePostActions();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const userPostsId = allPosts ? undefined : user.uid;

      const userPosts = await getUserPosts(userPostsId, showError);
      setPosts(userPosts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar las publicaciones del usuario';

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user.uid, showError, getUserPosts, allPosts]);

  const handleCreatePost = useCallback(
    async (postData: CreatePostData): Promise<Post | null> => {
      try {
        setCreating(true);
        setError(null);

        const newPost = await createPost(user.uid, user.displayName, user.email, postData);

        if (newPost) {
          setPosts((prev) => [newPost, ...prev]);
        }

        return newPost;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al crear la publicación';

        setError(errorMessage);

        return null;
      } finally {
        setCreating(false);
      }
    },
    [user.uid, user.displayName, user.email, createPost],
  );

  const handleDeletePost = useCallback(
    async (postId: string): Promise<boolean> => {
      try {
        setDeleting(postId);
        setError(null);

        const success = await deletePost(postId);

        if (success) {
          setPosts((prev) => prev.filter((post) => post.id !== postId));
        }

        return success;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al eliminar la publicación';
        setError(errorMessage);

        return false;
      } finally {
        setDeleting(null);
      }
    },
    [deletePost],
  );

  useEffect(() => {
    if (autoLoad) {
      fetchPosts();
    }
  }, [autoLoad, fetchPosts]);

  return {
    posts,
    loading,
    error,
    creating,
    deleting,

    fetchPosts,
    handleCreatePost,
    handleDeletePost,
  };
};
