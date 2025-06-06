import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export const authProviders = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

export type AuthProviderType = keyof typeof authProviders;
