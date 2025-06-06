import type { linkPasswordFormSchema, loginFormSchema, registerFormSchema } from '@/schemas/auth.schemas';

import type z from 'zod';

export interface Provider {
  providerId: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerData: Provider[];
}

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type LinkPasswordFormValues = z.infer<typeof linkPasswordFormSchema>;
