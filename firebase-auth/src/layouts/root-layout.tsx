import { useAuth } from '@/contexts/auth.context';
import { LoadingPage } from '@/pages/_public/loading.page';

import { Outlet } from 'react-router';

export function RootLayout() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return <Outlet />;
}
