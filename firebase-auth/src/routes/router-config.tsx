import { ProtectedLayout } from '@/layouts/protected-layout';
import { PublicLayout } from '@/layouts/public-layout';
import { RootLayout } from '@/layouts/root-layout';
import { LoginPage } from '@/pages/_auth/login.page';
import { Error404Page } from '@/pages/_error/404.page';
import { DashboardPage } from '@/pages/_protected/dashboard.page';
import { HomePage } from '@/pages/_public/home.page';

import { Route, Routes } from 'react-router';

export function RouterConfig() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<Error404Page />} />
      </Route>
    </Routes>
  );
}
