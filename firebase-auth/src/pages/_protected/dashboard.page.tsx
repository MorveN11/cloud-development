import type { ReactNode } from 'react';

import { EmailLogo } from '@/assets/logos/email-logo';
import { GithubLogo } from '@/assets/logos/github-logo';
import { GoogleLogo } from '@/assets/logos/google-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth.context';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';
import { authProviderInfo, type AuthProviderType } from '@/providers/auth.providers';

export function DashboardPage() {
  const { user } = useAuth();

  const { handleLogout, handleLinkWithProvider } = useAuthActions();

  const missingProviders = Object.values(authProviderInfo).filter(
    (provider) => !user.providerData.some((p) => p.providerId === provider.providerId),
  );

  const iconMap: Record<string, ReactNode> = {
    'google.com': <GoogleLogo />,
    'github.com': <GithubLogo />,
    password: <EmailLogo />,
  };

  const getProviderIcon = (providerId: AuthProviderType) => {
    const provider = authProviderInfo[providerId];

    return iconMap[provider.providerId];
  };

  return (
    <div className="custom-container flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            <h1>Welcome to the dashboard {user.displayName}!</h1>
          </CardTitle>
          <CardDescription>
            <small>Here you can manage your account</small>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                    {getProviderIcon(provider.providerId)} {provider.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <Button className="w-full" variant="default" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
