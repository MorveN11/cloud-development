import { AuthProvider } from '@/contexts/auth.context';
import { RouterConfig } from '@/routes/router-config';
import { authService } from '@/services/auth.service';

import { Toaster } from 'sonner';

export function App() {
  return (
    <>
      <AuthProvider authService={authService}>
        <RouterConfig />
      </AuthProvider>
      <Toaster closeButton expand position="top-right" duration={5000} />
    </>
  );
}
