import { createContext, useContext, useEffect, useState } from 'react';

import type { AuthProviderType } from '@/providers/auth.providers';
import type { IAuthService } from '@/services/auth.service';
import type { ApiResponse } from '@/types/api.types';
import type { User } from '@/types/auth.types';

interface AuthContextType {
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  register: (email: string, password: string, displayName: string) => Promise<ApiResponse<User>>;
  login: (email: string, password: string) => Promise<ApiResponse<User>>;
  loginWithProvider: (providerId: AuthProviderType) => Promise<ApiResponse<User>>;
  logout: () => Promise<ApiResponse>;
  linkWithProvider: (providerId: AuthProviderType) => Promise<ApiResponse<User>>;
  linkWithPassword: (email: string, password: string) => Promise<ApiResponse<User>>;
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

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser || ({} as User));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authService]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user.uid,
        register: authService.register,
        login: authService.login,
        loginWithProvider: authService.loginWithProvider,
        logout: authService.logout,
        linkWithProvider: authService.linkWithProvider,
        linkWithPassword: authService.linkWithPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
