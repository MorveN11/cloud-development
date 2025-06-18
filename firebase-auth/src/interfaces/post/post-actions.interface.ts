import type { CreatePostData, Post } from '@/types/post.types';

export interface IPostActions {
  createPost: (userId: string, userEmail: string, postData: CreatePostData) => Promise<Post | null>;
  getUserPosts: (userId: string, showError?: boolean) => Promise<Post[]>;
  deletePost: (postId: string) => Promise<boolean>;
}
