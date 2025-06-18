import type { CreateUserProfileDto, UpdateUserProfileDto, UserProfile } from '@/types/user.types';

export interface IUserActions {
  checkUserExists(uid: string, showError: boolean): Promise<boolean>;
  getUserById(uid: string, showError: boolean): Promise<UserProfile | null>;

  createUser(userData: CreateUserProfileDto): Promise<UserProfile | null>;
  updateUser(uid: string, data: UpdateUserProfileDto): Promise<UserProfile | null>;
  deleteUser(uid: string): Promise<boolean>;
}
