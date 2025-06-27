import type { ApiResponse } from '@/types/api.types';
import type { Like } from '@/types/like.types';

export interface ILikeRepository {
  toggleLike(postId: string, userId: string): Promise<ApiResponse<boolean>>;
  getUserLikes(userId: string): Promise<ApiResponse<Like[]>>;
}
