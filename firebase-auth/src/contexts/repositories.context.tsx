import { createContext, useContext } from 'react';

import type { IUserRepository } from '@/interfaces/user/user-repository.interface';

interface RepositoriesContextType {
  userRepository: IUserRepository;
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
  children,
}: {
  userRepository: IUserRepository;
  children: React.ReactNode;
}) {
  return (
    <RepositoriesContext.Provider
      value={{
        userRepository,
      }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
}
