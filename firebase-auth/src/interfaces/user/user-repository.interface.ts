import type { ApiResponse } from '@/types/api.types';
import type { CreateUserProfileDto, UpdateUserProfileDto, UserProfile } from '@/types/user.types';

export interface IUserRepository {
  exists(uid: string): Promise<ApiResponse<boolean>>;
  getById(uid: string): Promise<ApiResponse<UserProfile>>;

  create(data: CreateUserProfileDto): Promise<ApiResponse<UserProfile>>;
  update(uid: string, data: UpdateUserProfileDto): Promise<ApiResponse<UserProfile>>;

  updateNotificationToken(uid: string, token: string): Promise<ApiResponse<UserProfile>>;
  delete(uid: string): Promise<ApiResponse>;
}
