import { AuthProvider } from '@/contexts/auth.context';
import { RepositoriesProvider } from '@/contexts/repositories.context';
import { postRepository } from '@/repositories/post.repository';
import { userRepository } from '@/repositories/user.repository';
import { RouterConfig } from '@/routes/router-config';
import { authService } from '@/services/auth.service';
import { contentModerationService } from '@/services/content-moderation.service';
import { imageService } from '@/services/image.service';

import { Toaster } from 'sonner';

export function App() {
  return (
    <>
      <RepositoriesProvider
        userRepository={userRepository}
        postRepository={postRepository(imageService, contentModerationService)}
      >
        <AuthProvider authService={authService(userRepository)}>
          <RouterConfig />
        </AuthProvider>
      </RepositoriesProvider>
      <Toaster closeButton expand position="top-right" duration={5000} />
    </>
  );
}
