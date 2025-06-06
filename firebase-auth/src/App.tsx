import { AuthProvider } from '@/contexts/auth.context';
import { cn } from '@/lib/utils';
import { RouterConfig } from '@/routes/router-config';
import { authService } from '@/services/auth.service';

import { BrowserRouter } from 'react-router';
import { Toaster } from 'sonner';

export function App() {
  return (
    <div className={cn('font-sans antialiased', import.meta.env.DEV ? 'debug-screens' : '')}>
      <AuthProvider authService={authService}>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </AuthProvider>
      <Toaster closeButton expand position="top-right" duration={5000} />
    </div>
  );
}
