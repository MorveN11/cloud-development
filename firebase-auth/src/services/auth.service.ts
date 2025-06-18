import { auth } from '@/apps/firebase.app';
import { AuthErrorCode, CustomAuthError, handleAuthError } from '@/error-handlers/auth.error-handler';
import type { IAuthService } from '@/interfaces/auth/auth-service.interface';
import type { IUserRepository } from '@/interfaces/user/user-repository.interface';
import { authProviders, type AuthProviderType } from '@/providers/auth.providers';
import { userSchema } from '@/schemas/auth.schemas';
import { errorResponse, successResponse, type ApiResponse } from '@/types/api.types';
import type { User } from '@/types/auth.types';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  linkWithCredential,
  linkWithPopup,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async register(email: string, password: string, displayName: string): Promise<ApiResponse<User>> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: displayName,
      });

      await user.reload();

      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new CustomAuthError(AuthErrorCode.USER_NOT_FOUND);
      }

      const createdUser = userSchema.safeParse({
        uid: currentUser.uid,
        email: currentUser.email || '',
        displayName: currentUser.displayName || '',
        providerData: currentUser.providerData.map((provider) => ({
          providerId: provider.providerId,
        })),
      });

      if (!createdUser.success) {
        throw new CustomAuthError(AuthErrorCode.USER_DATA_PARSE_ERROR);
      }

      return successResponse(createdUser.data);
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }

  public async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const { user } = userCredential;

      const loggedUser = userSchema.safeParse({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        providerData: user.providerData.map((provider) => ({
          providerId: provider.providerId,
        })),
      });

      if (!loggedUser.success) {
        throw new CustomAuthError(AuthErrorCode.USER_DATA_PARSE_ERROR);
      }

      return successResponse(loggedUser.data);
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }

  public async loginWithProvider(providerId: AuthProviderType): Promise<ApiResponse<User>> {
    try {
      if (providerId === 'password') {
        throw new CustomAuthError(AuthErrorCode.PROVIDER_NOT_SUPPORTED);
      }

      const provider = authProviders[providerId];

      const userCredential = await signInWithPopup(auth, provider);

      const { user } = userCredential;

      const loggedUser = userSchema.safeParse({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        providerData: user.providerData.map((provider) => ({
          providerId: provider.providerId,
        })),
      });

      if (!loggedUser.success) {
        throw new CustomAuthError(AuthErrorCode.USER_DATA_PARSE_ERROR);
      }

      return successResponse(loggedUser.data);
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }

  public async logout(): Promise<ApiResponse> {
    try {
      await signOut(auth);

      return successResponse();
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }

  public onAuthStateChanged(
    callback: (
      user: {
        uid: string;
        email: string | null;
        displayName: string | null;
        providerData: { providerId: string }[];
      } | null,
    ) => void,
  ): () => void {
    return firebaseOnAuthStateChanged(auth, callback);
  }

  public async linkWithProvider(providerId: AuthProviderType): Promise<ApiResponse<User>> {
    try {
      if (providerId === 'password') {
        throw new CustomAuthError(AuthErrorCode.PROVIDER_NOT_SUPPORTED);
      }

      const user = auth.currentUser;

      if (!user) {
        throw new CustomAuthError(AuthErrorCode.CURRENT_USER_NOT_FOUND);
      }

      const provider = authProviders[providerId];

      const userCredential = await linkWithPopup(user, provider);

      const { user: updatedUser } = userCredential;

      const linkedUser = userSchema.safeParse({
        uid: updatedUser.uid,
        email: updatedUser.email || '',
        displayName: updatedUser.displayName || '',
        providerData: updatedUser.providerData.map((provider) => ({
          providerId: provider.providerId,
        })),
      });

      if (!linkedUser.success) {
        throw new CustomAuthError(AuthErrorCode.USER_DATA_PARSE_ERROR);
      }

      const existsResponse = await this.userRepository.exists(linkedUser.data.uid);

      if (existsResponse.success && existsResponse.data) {
        this.userRepository.update(linkedUser.data.uid, linkedUser.data);
      }

      return successResponse(linkedUser.data);
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }

  public async linkWithPassword(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const provider = authProviders.password;
      const credential = provider.credential(email, password);

      const user = auth.currentUser;

      if (!user) {
        throw new CustomAuthError(AuthErrorCode.CURRENT_USER_NOT_FOUND);
      }

      const userCredential = await linkWithCredential(user, credential);

      const { user: updatedUser } = userCredential;

      const linkedUser = userSchema.safeParse({
        uid: updatedUser.uid,
        email: updatedUser.email || '',
        displayName: updatedUser.displayName || '',
        providerData: updatedUser.providerData.map((provider) => ({
          providerId: provider.providerId,
        })),
      });

      if (!linkedUser.success) {
        throw new CustomAuthError(AuthErrorCode.USER_DATA_PARSE_ERROR);
      }

      const existsResponse = await this.userRepository.exists(linkedUser.data.uid);

      if (existsResponse.success && existsResponse.data) {
        this.userRepository.update(linkedUser.data.uid, linkedUser.data);
      }

      return successResponse(linkedUser.data);
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }
}

export const authService = (userRepository: IUserRepository) => new AuthService(userRepository);
