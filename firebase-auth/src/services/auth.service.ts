import { auth } from '@/apps/firebase.app';
import { handleAuthError } from '@/error-handlers/auth.error-handler';
import { authProviders, type AuthProviderType } from '@/providers/auth.providers';
import { errorResponse, successResponse, type ApiResponse } from '@/types/api.types';
import type { User } from '@/types/auth.types';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

export interface IAuthService {
  register(email: string, password: string, displayName: string): Promise<ApiResponse<User>>;

  login(email: string, password: string): Promise<ApiResponse<User>>;
  loginWithProvider(providerId: AuthProviderType): Promise<ApiResponse<User>>;

  logout(): Promise<ApiResponse>;

  onAuthStateChanged(callback: (user: User | null) => void): () => void;
}

class AuthService implements IAuthService {
  public async register(email: string, password: string, displayName: string): Promise<ApiResponse<User>> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const { user } = userCredential;

      await updateProfile(user, { displayName });
      await user.reload();

      return successResponse(user);
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }

  public async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const { user } = userCredential;

      return successResponse(user);
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }

  public async loginWithProvider(providerId: AuthProviderType): Promise<ApiResponse<User>> {
    try {
      const provider = authProviders[providerId];

      const userCredential = await signInWithPopup(auth, provider);

      const { user } = userCredential;

      return successResponse(user);
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

  public onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return firebaseOnAuthStateChanged(auth, callback);
  }
}

export const authService = new AuthService();
