import { CenteredContainer } from '@/components/ui/centered-container';
import { CreateProfileForm } from '@/components/user/create-profile.form';

import { useNavigate } from 'react-router';

export function CompleteRegistrationPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/user-profile');
  };

  return (
    <CenteredContainer fullScreen>
      <CreateProfileForm onSuccess={handleSuccess} />
    </CenteredContainer>
  );
}
