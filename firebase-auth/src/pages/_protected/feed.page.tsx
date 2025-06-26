import { MainFeed } from '@/components/feed/main-feed';
import { MainSidebar } from '@/components/layout/main-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingState } from '@/components/ui/loading-state';
import { useAuth } from '@/contexts/auth.context';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';
import { useNotifications } from '@/hooks/user/use-notifications.hook';
import { useUserProfile } from '@/hooks/user/use-user-profile.hook';

import { Link } from 'react-router';

export function FeedPage() {
  const { user } = useAuth();
  const { handleLogout } = useAuthActions();
  const { userProfile, loading } = useUserProfile({ user });

  useNotifications();

  if (loading) {
    return <LoadingState message="Cargando información del usuario..." fullScreen />;
  }

  if (!userProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Completa tu Registro</CardTitle>
            <CardDescription>Por favor completa tu perfil para continuar usando AltaConnect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" asChild>
              <Link to="/complete-registration">Completar Registro</Link>
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex gap-6 px-6 py-6">
      <aside className="hidden w-72 shrink-0 lg:block">
        <MainSidebar user={user} />
      </aside>

      <main className="min-w-0 flex-1">
        <MainFeed userProfile={userProfile} />
      </main>
    </div>
  );
}
