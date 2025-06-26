import { ProviderIcon } from '@/components/auth/provider.icon';
import { MainSidebar } from '@/components/layout/main-sidebar';
import { UserProfilePosts } from '@/components/posts/user-profile-posts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorState } from '@/components/ui/error-state';
import { LoadingState } from '@/components/ui/loading-state';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth.context';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';
import { useUserProfile } from '@/hooks/user/use-user-profile.hook';
import { authProviderInfo } from '@/providers/auth.providers';

import { CalendarDays, Edit3, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router';

export function UserProfilePage() {
  const { user } = useAuth();
  const { handleLinkWithProvider } = useAuthActions();
  const { userProfile, loading, fetchUserProfile } = useUserProfile({ user });

  if (loading) {
    return <LoadingState message="Cargando perfil..." fullScreen variant="gradient" />;
  }

  if (userProfile === null) {
    return (
      <ErrorState message="Perfil no encontrado. Por favor, completa tu registro." onRetry={() => fetchUserProfile()} />
    );
  }

  const missingProviders = Object.values(authProviderInfo).filter(
    (provider) => !user.providerData.some((p) => p.providerId === provider.providerId),
  );

  return (
    <div className="flex gap-6 px-6 py-6">
      <aside className="hidden w-72 shrink-0 lg:block">
        <MainSidebar user={user} />
      </aside>

      <main className="mx-auto max-w-4xl min-w-0 flex-1">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-primary/20 via-blue-600/20 to-green-600/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            </div>

            <CardContent className="relative px-6 pb-6">
              <div className="-mt-16 flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src={user.email} alt={user.displayName} />
                    <AvatarFallback className="bg-primary text-3xl text-primary-foreground">
                      {user.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="mt-4 flex-1 sm:mt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">{user.displayName}</h1>
                      <p className="text-muted-foreground">@{user.email.split('@')[0]}</p>
                      <p className="mt-2 text-sm">Conectando Bolivia a través de AltaConnect</p>
                    </div>

                    <div className="mt-4 flex gap-2 sm:mt-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/edit-profile" className="flex items-center">
                          <Edit3 className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {userProfile.address}
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      Miembro desde{' '}
                      {new Date(userProfile.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts">Publicaciones</TabsTrigger>
              <TabsTrigger value="about">Acerca de</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6 space-y-4">
              <UserProfilePosts user={userProfile} />
            </TabsContent>

            <TabsContent value="about" className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 muted" />
                      <span title={userProfile.email}>{userProfile.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 muted" />
                      <span title={userProfile.address}>{userProfile.address}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Cuentas Conectadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {user.providerData.map((provider, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="flex w-full items-center justify-between rounded-lg border bg-white p-3 disabled:opacity-100"
                          disabled
                        >
                          <div className="flex items-center gap-3">
                            <ProviderIcon providerId={provider.providerId} size="sm" />
                            <span className="font-medium capitalize">
                              {provider.providerId === 'password'
                                ? 'Email & Password'
                                : provider.providerId.replace('.com', '')}
                            </span>
                          </div>
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {missingProviders.length > 0 && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Proveedores Faltantes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {missingProviders.map((provider, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="flex w-full items-center justify-between rounded-lg border bg-white p-3 hover:bg-gray-200"
                            onClick={() => handleLinkWithProvider(provider.providerId)}
                          >
                            <div className="flex items-center gap-3">
                              <ProviderIcon providerId={provider.providerId} size="sm" />
                              <span className="font-medium capitalize">
                                {provider.providerId === 'password'
                                  ? 'Email & Password'
                                  : provider.providerId.replace('.com', '')}
                              </span>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Información de la Cuenta</CardTitle>
                  <CardDescription>Detalles de tu cuenta y configuración</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Dirección de Email</label>
                    <div className="rounded-md border bg-muted p-3">
                      <span className="text-sm">{userProfile.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Nombre de Usuario</label>
                    <div className="rounded-md border bg-muted p-3">
                      <span className="text-sm">{userProfile.displayName}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Fecha de Cumpleaños</label>
                    <div className="rounded-md border bg-muted p-3">
                      <span className="text-sm">
                        {userProfile.birthDate
                          ? new Date(userProfile.birthDate).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'No especificado'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Última Actualización</label>
                    <div className="rounded-md border bg-muted p-3">
                      <span className="text-sm">
                        {new Date(userProfile.updatedAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
