import { ProviderIcon } from '@/components/auth/provider-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CenteredContainer } from '@/components/ui/centered-container';
import { ErrorState } from '@/components/ui/error-state';
import { LoadingState } from '@/components/ui/loading-state';
import { useAuth } from '@/contexts/auth.context';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';
import { useUserProfile } from '@/hooks/user/use-user-profile.hook';

import { CalendarDays, Edit3, Home, LogOut, MapPin, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';

export function UserProfilePage() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { handleLogout } = useAuthActions();
  const { userProfile, loading, error, fetchUserProfile } = useUserProfile({ user, showError: true });

  if (loading) {
    return <LoadingState message="Loading profile..." fullScreen />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={fetchUserProfile}
        onBack={() => navigate('/dashboard')}
        backLabel="Back to Dashboard"
        fullScreen
      />
    );
  }

  if (!userProfile) {
    return (
      <CenteredContainer fullScreen>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>Your profile information is not available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              Back to Dashboard
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Logout
            </Button>
          </CardContent>
        </Card>
      </CenteredContainer>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="custom-container">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="mt-1 text-gray-600">Manage your account information and settings</p>
            </div>
            <Button onClick={() => navigate('/dashboard')} variant="outline" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 py-4 text-white">
                <CardTitle className="text-xl">{userProfile.displayName}</CardTitle>
                <CardDescription className="text-blue-100">{userProfile.email}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{userProfile.address || 'No address provided'}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-sm">
                      {userProfile.birthDate
                        ? new Date(userProfile.birthDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'No birth date provided'}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500">
                      Member since{' '}
                      {userProfile.createdAt
                        ? new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                          })
                        : 'Unknown'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {userProfile.providerData && userProfile.providerData.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Connected Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userProfile.providerData.map((provider, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border bg-white p-3">
                        <div className="flex items-center gap-3">
                          <ProviderIcon providerId={provider.providerId} size="sm" />
                          <span className="font-medium capitalize">
                            {provider.providerId === 'password'
                              ? 'Email & Password'
                              : provider.providerId.replace('.com', '')}
                          </span>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button onClick={() => navigate('/edit-profile')} variant="outline" className="justify-start">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your account details and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">User ID</label>
                    <div className="rounded-md border bg-gray-50 p-3">
                      <code className="text-xs text-gray-600">{userProfile.uid}</code>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="rounded-md border bg-gray-50 p-3">
                      <span className="text-sm text-gray-900">{userProfile.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Display Name</label>
                    <div className="rounded-md border bg-gray-50 p-3">
                      <span className="text-sm text-gray-900">{userProfile.displayName || 'Not set'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Updated</label>
                    <div className="rounded-md border bg-gray-50 p-3">
                      <span className="text-sm text-gray-900">
                        {userProfile.updatedAt
                          ? new Date(userProfile.updatedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Never'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Your Posts</CardTitle>
                <CardDescription>Manage your posts and content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">No posts yet</p>
                    <p className="text-xs text-gray-400">This feature will be available soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
