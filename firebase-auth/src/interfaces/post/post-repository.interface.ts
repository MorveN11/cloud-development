import type { ApiResponse } from '@/types/api.types';
import type { CreatePostData, Post } from '@/types/post.types';

export interface IPostRepository {
  create(
    authorUID: string,
    authorDisplayName: string,
    authorEmail: string,
    postData: CreatePostData,
  ): Promise<ApiResponse<Post>>;
  getUserPosts(authorUID: string | undefined): Promise<ApiResponse<Post[]>>;
  delete(postId: string): Promise<ApiResponse>;
}
