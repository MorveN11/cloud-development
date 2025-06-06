import { Navbar } from '@/components/layout/nav-bar';

import { Outlet } from 'react-router';

export function PublicLayout() {
  return (
    <>
      <Navbar />

      <main className="custom-container">
        <Outlet />
      </main>
    </>
  );
}
