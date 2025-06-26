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
    return <LoadingState message="Cargando perfil..." fullScreen />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={fetchUserProfile}
        onBack={() => navigate('/user-profile')}
        backLabel="Volver al perfil"
        fullScreen
      />
    );
  }

  if (!userProfile) {
    return (
      <ErrorState
        title="Perfil no encontrado"
        message="Tu información de perfil no está disponible"
        onBack={() => navigate('/user-profile')}
        backLabel="Volver al perfil"
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
    <CenteredContainer fullScreen className="flex-col gap-4">
      <div className="text-center">
        <h2 className="text-primary">Edita tu Perfil</h2>
        <p className="muted">Actualiza tu información personal en AltaConnect</p>
      </div>

      <EditProfileForm userProfile={userProfile} onSuccess={handleSuccess} onCancel={handleCancel} />
    </CenteredContainer>
  );
}
