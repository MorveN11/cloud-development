import { Navbar } from '@/components/layout/nav-bar';
import { useAuth } from '@/contexts/auth.context';

import { Navigate, Outlet, useLocation } from 'react-router';

export function AuthLayout() {
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/feed" state={{ from: location }} replace />;
  }

  return (
    <>
      <Navbar />

      <main className="custom-container">
        <Outlet />
      </main>
    </>
  );
}
