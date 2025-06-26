import { db } from '@/apps/firebase.app';
import { CustomUserError, UserErrorCode, handleUserError } from '@/error-handlers/user.error-handler';
import type { IUserRepository } from '@/interfaces/user/user-repository.interface';
import { removeEmptyValues } from '@/lib/object.utils';
import { userProfileSchema } from '@/schemas/user.schemas';
import type { ApiResponse } from '@/types/api.types';
import { errorResponse, successResponse } from '@/types/api.types';
import type { CreateUserProfileDto, UpdateUserProfileDto, UserProfile } from '@/types/user.types';

import { Timestamp, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

class UserRepository implements IUserRepository {
  private readonly collectionName = 'users';
  private readonly usersCollection = collection(db, this.collectionName);

  public async exists(uid: string): Promise<ApiResponse<boolean>> {
    try {
      const userDoc = doc(this.usersCollection, uid);
      const docSnap = await getDoc(userDoc);

      return successResponse(docSnap.exists());
    } catch (error) {
      return errorResponse(handleUserError(error));
    }
  }

  public async getById(uid: string): Promise<ApiResponse<UserProfile>> {
    try {
      const userDoc = doc(this.usersCollection, uid);
      const docSnap = await getDoc(userDoc);

      if (!docSnap.exists()) {
        return errorResponse(handleUserError(new CustomUserError(UserErrorCode.USER_NOT_FOUND)));
      }

      const data = docSnap.data();

      if (!data) {
        return errorResponse(handleUserError(new CustomUserError(UserErrorCode.DOCUMENT_PARSE_ERROR)));
      }

      const user = userProfileSchema.safeParse({
        ...data,
        birthDate: new Timestamp(data.birthDate.seconds, data.birthDate.nanoseconds).toDate(),
        createdAt: new Timestamp(data.createdAt.seconds, data.createdAt.nanoseconds).toDate(),
        updatedAt: new Timestamp(data.updatedAt.seconds, data.updatedAt.nanoseconds).toDate(),
      });

      if (!user.success) {
        console.error('Failed to parse user document:', user.error);
        return errorResponse(handleUserError(new CustomUserError(UserErrorCode.DOCUMENT_PARSE_ERROR)));
      }

      return successResponse(user.data);
    } catch (error) {
      return errorResponse(handleUserError(error));
    }
  }

  public async create(userData: CreateUserProfileDto): Promise<ApiResponse<UserProfile>> {
    try {
      const existsResponse = await this.exists(userData.uid);

      if (existsResponse.success && existsResponse.data) {
        return errorResponse(handleUserError(new CustomUserError(UserErrorCode.USER_ALREADY_EXISTS)));
      }

      const userDoc = doc(this.usersCollection, userData.uid);

      const user = userProfileSchema.safeParse({
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (!user.success) {
        return errorResponse(handleUserError(new CustomUserError(UserErrorCode.VALIDATION_ERROR)));
      }

      await setDoc(userDoc, user.data);

      return successResponse(user.data);
    } catch (error) {
      return errorResponse(handleUserError(error));
    }
  }

  public async update(uid: string, data: UpdateUserProfileDto): Promise<ApiResponse<UserProfile>> {
    try {
      const currentUserData = await this.getById(uid);

      if (!currentUserData.success) {
        return errorResponse(currentUserData.error);
      }

      const cleanedData = removeEmptyValues(data);

      const user = userProfileSchema.safeParse({
        ...currentUserData.data,
        ...cleanedData,
        updatedAt: new Date(),
      });

      if (!user.success) {
        return errorResponse(handleUserError(new CustomUserError(UserErrorCode.VALIDATION_ERROR)));
      }

      const userDoc = doc(this.usersCollection, uid);

      await updateDoc(userDoc, user.data);

      return successResponse(user.data);
    } catch (error) {
      return errorResponse(handleUserError(error));
    }
  }

  public async updateNotificationToken(uid: string, token: string): Promise<ApiResponse<UserProfile>> {
    try {
      const user = await this.getById(uid);

      if (!user.success) {
        return errorResponse(user.error);
      }

      const userData = user.data;

      if (userData.fcmTokens.includes(token)) {
        return successResponse(userData);
      }

      userData.fcmTokens.push(token);

      return this.update(uid, { fcmTokens: userData.fcmTokens });
    } catch (error) {
      return errorResponse(handleUserError(error));
    }
  }

  public async delete(uid: string): Promise<ApiResponse> {
    try {
      const userDoc = doc(this.usersCollection, uid);

      const docSnap = await getDoc(userDoc);

      if (!docSnap.exists()) {
        return errorResponse(handleUserError(new CustomUserError(UserErrorCode.USER_NOT_FOUND)));
      }

      await deleteDoc(userDoc);

      return successResponse();
    } catch (error) {
      return errorResponse(handleUserError(error));
    }
  }
}

export const userRepository = new UserRepository();
