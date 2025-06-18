import { AuthProvider } from '@/contexts/auth.context';
import { RepositoriesProvider } from '@/contexts/repositories.context';
import { userRepository } from '@/repositories/user.repository';
import { RouterConfig } from '@/routes/router-config';
import { authService } from '@/services/auth.service';

import { Toaster } from 'sonner';

export function App() {
  return (
    <>
      <RepositoriesProvider userRepository={userRepository}>
        <AuthProvider authService={authService(userRepository)}>
          <RouterConfig />
        </AuthProvider>
      </RepositoriesProvider>
      <Toaster closeButton expand position="top-right" duration={5000} />
    </>
  );
}
