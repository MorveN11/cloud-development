import { useAuth } from '@/contexts/auth.context';
import { cn } from '@/lib/utils';
import { LoadingPage } from '@/pages/_public/loading.page';

import { Outlet } from 'react-router';

export function RootLayout() {
  const { loading } = useAuth();

  return (
    <div className={cn('font-sans antialiased', import.meta.env.DEV ? 'debug-screens' : '')}>
      {loading ? <LoadingPage /> : <Outlet />}
    </div>
  );
}
