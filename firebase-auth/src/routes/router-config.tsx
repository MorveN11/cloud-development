import { AuthLayout } from '@/layouts/auth-layout';
import { ProtectedLayout } from '@/layouts/protected-layout';
import { RootLayout } from '@/layouts/root-layout';
import { LoginPage } from '@/pages/_auth/login.page';
import { RegisterPage } from '@/pages/_auth/register.page';
import { Error404Page } from '@/pages/_error/404.page';
import { CompleteRegistrationPage } from '@/pages/_protected/complete-registration.page';
import { EditProfilePage } from '@/pages/_protected/edit-profile.page';
import { FeedPage } from '@/pages/_protected/feed.page';
import { LinkPasswordPage } from '@/pages/_protected/link-password.page';
import { UserProfilePage } from '@/pages/_protected/user-profile.page';
import { HomePage } from '@/pages/_public/home.page';

import { Route, Routes } from 'react-router';

export function RouterConfig() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="feed" element={<FeedPage />} />
          <Route path="user-profile" element={<UserProfilePage />} />
          <Route path="complete-registration" element={<CompleteRegistrationPage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
          <Route path="link-password" element={<LinkPasswordPage />} />
        </Route>
        <Route path="*" element={<Error404Page />} />
      </Route>
    </Routes>
  );
}
