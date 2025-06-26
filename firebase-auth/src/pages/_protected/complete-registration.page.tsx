import { CenteredContainer } from '@/components/ui/centered-container';
import { CreateProfileForm } from '@/components/user/create-profile.form';
import { useAuth } from '@/contexts/auth.context';

import { useNavigate } from 'react-router';

export function CompleteRegistrationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/feed');
  };

  return (
    <CenteredContainer fullScreen className="flex-col gap-4">
      <div className="text-center">
        <h2 className="text-primary">¡Bienvenido a AltaConnect!</h2>
        <p className="muted">Completa tu perfil para comenzar a conectar con otros bolivianos</p>
      </div>

      <CreateProfileForm user={user} onSuccess={handleSuccess} />
    </CenteredContainer>
  );
}
