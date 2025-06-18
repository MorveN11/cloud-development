import { ProviderIcon } from '@/components/auth/provider-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CenteredContainer } from '@/components/ui/centered-container';
import { LoadingState } from '@/components/ui/loading-state';
import { useAuth } from '@/contexts/auth.context';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';
import { useUserProfile } from '@/hooks/user/use-user-profile.hook';
import { authProviderInfo } from '@/providers/auth.providers';

import { useNavigate } from 'react-router';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleLogout, handleLinkWithProvider } = useAuthActions();
  const { userProfile, loading } = useUserProfile({ user });

  if (loading) {
    return <LoadingState message="Loading user information..." fullScreen />;
  }

  if (!userProfile) {
    return (
      <CenteredContainer fullScreen>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Complete Your Registration</CardTitle>
            <CardDescription>Please complete your profile to continue using the application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => navigate('/complete-registration')} className="w-full">
              Complete Registration
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Logout
            </Button>
          </CardContent>
        </Card>
      </CenteredContainer>
    );
  }

  const missingProviders = Object.values(authProviderInfo).filter(
    (provider) => !user.providerData.some((p) => p.providerId === provider.providerId),
  );

  return (
    <CenteredContainer fullScreen>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            <h1>Welcome to the dashboard {user.displayName}</h1>
          </CardTitle>
          <CardDescription>
            <small>Here you can manage your account</small>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => navigate('/user-profile')} className="w-full" variant="default">
            View My Profile
          </Button>
          {missingProviders.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <small className="text-center muted">You can also link your account with other providers</small>
              <div className="flex w-full flex-wrap gap-2">
                {missingProviders.map((provider) => (
                  <Button
                    key={provider.providerId}
                    variant="outline"
                    className="flex min-w-[calc(50%-0.25rem)] flex-1 items-center"
                    onClick={() => handleLinkWithProvider(provider.providerId)}
                  >
                    <ProviderIcon providerId={provider.providerId} size="sm" className="mr-2" /> {provider.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <Button className="w-full" variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </CenteredContainer>
  );
}
