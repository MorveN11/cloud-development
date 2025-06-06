import { RootLayout } from '@/layouts/root-layout';
import { HomePage } from '@/pages/home-page';

import { Route, Routes } from 'react-router';

export const RouterConfig = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};
