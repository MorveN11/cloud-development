import { CenteredContainer } from '@/components/ui/centered-container';
import { ErrorState } from '@/components/ui/error-state';
import { LoadingState } from '@/components/ui/loading-state';
import { EditProfileForm } from '@/components/user/edit-profile.form';
import { useAuth } from '@/contexts/auth.context';
import { useUserProfile } from '@/hooks/user/use-user-profile.hook';

import { useNavigate } from 'react-router';

export function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userProfile, loading, error, fetchUserProfile } = useUserProfile({ user, showError: true });

  if (loading) {
    return <LoadingState message="Loading profile..." fullScreen />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={fetchUserProfile}
        onBack={() => navigate('/user-profile')}
        backLabel="Back to Profile"
        fullScreen
      />
    );
  }

  if (!userProfile) {
    return (
      <ErrorState
        title="Profile Not Found"
        message="Your profile information is not available"
        onBack={() => navigate('/user-profile')}
        backLabel="Back to Profile"
        fullScreen
      />
    );
  }

  const handleSuccess = () => {
    navigate('/user-profile');
  };

  const handleCancel = () => {
    navigate('/user-profile');
  };

  return (
    <CenteredContainer fullScreen>
      <EditProfileForm userProfile={userProfile} onSuccess={handleSuccess} onCancel={handleCancel} />
    </CenteredContainer>
  );
}
