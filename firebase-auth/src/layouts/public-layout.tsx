import { useAuth } from '@/contexts/auth.context';

import { Navigate, Outlet, useLocation } from 'react-router';

export function PublicLayout() {
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
