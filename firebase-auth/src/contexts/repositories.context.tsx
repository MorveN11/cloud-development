import { createContext, useContext } from 'react';

import type { IPostRepository } from '@/interfaces/post/post-repository.interface';
import type { IUserRepository } from '@/interfaces/user/user-repository.interface';

interface RepositoriesContextType {
  userRepository: IUserRepository;
  postRepository: IPostRepository;
}

const RepositoriesContext = createContext<RepositoriesContextType | undefined>(undefined);

export function useRepositories() {
  const context = useContext(RepositoriesContext);

  if (!context) {
    throw new Error('useRepositories debe usarse dentro de un RepositoriesProvider');
  }

  return context;
}

export function RepositoriesProvider({
  userRepository,
  postRepository,
  children,
}: {
  userRepository: IUserRepository;
  postRepository: IPostRepository;
  children: React.ReactNode;
}) {
  return (
    <RepositoriesContext.Provider
      value={{
        userRepository,
        postRepository,
      }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
}
