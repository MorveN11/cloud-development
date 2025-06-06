import { EmailAuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export const authProviders = {
  password: EmailAuthProvider,
  'google.com': new GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' }),
  'github.com': new GithubAuthProvider().setCustomParameters({ prompt: 'select_account' }),
};

export type AuthProviderType = keyof typeof authProviders;

export const authProviderInfo: Record<AuthProviderType, { name: string; icon: string; providerId: AuthProviderType }> =
  {
    password: {
      name: 'Password',
      icon: 'lock',
      providerId: 'password',
    },
    'google.com': {
      name: 'Google',
      icon: 'google',
      providerId: 'google.com',
    },
    'github.com': {
      name: 'Github',
      icon: 'github',
      providerId: 'github.com',
    },
  };
