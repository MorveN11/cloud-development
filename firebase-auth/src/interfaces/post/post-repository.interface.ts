import type { ApiResponse } from '@/types/api.types';
import type { CreatePostData, Post, PostWithLikes } from '@/types/post.types';

export interface IPostRepository {
  create(
    authorUID: string,
    authorDisplayName: string,
    authorEmail: string,
    postData: CreatePostData,
  ): Promise<ApiResponse<Post>>;
  getPosts(authorUID: string | undefined): Promise<ApiResponse<Post[]>>;

  getPostsWithLikes(userId?: string, authorUID?: string): Promise<ApiResponse<PostWithLikes[]>>;

  delete(postId: string): Promise<ApiResponse>;
}
