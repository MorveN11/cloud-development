import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import type { IAuthService } from '@/interfaces/auth/auth-service.interface';
import type { AuthProviderType } from '@/providers/auth.providers';
import type { User } from '@/types/auth.types';

interface AuthContextType {
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  authService: IAuthService;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  return context;
}

export function AuthProvider({ authService, children }: { authService: IAuthService; children: React.ReactNode }) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const updateUserState = useCallback(
    (
      currentUser: {
        uid: string;
        email: string | null;
        displayName: string | null;
        providerData: { providerId: string }[];
      } | null,
    ) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || '',
          providerData: currentUser.providerData.map((provider) => ({
            providerId: provider.providerId as AuthProviderType,
          })),
        });
      } else {
        setUser({} as User);
      }
      setLoading(false);
    },
    [],
  );

  const refreshUser = useCallback(async () => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      updateUserState(currentUser);
      unsubscribe();
    });
  }, [authService, updateUserState]);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(updateUserState);
    return () => unsubscribe();
  }, [authService, updateUserState]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user.uid,
        authService,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
