import { useAuth } from '@/contexts/auth.context';

import { Navigate, Outlet, useLocation } from 'react-router';

export function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <main className="min-h-screen bg-background">
      <Outlet />
    </main>
  );
}
