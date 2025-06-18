import type {
  linkPasswordFormSchema,
  loginFormSchema,
  providerSchema,
  registerFormSchema,
  userSchema,
} from '@/schemas/auth.schemas';

import type z from 'zod';

export type Provider = z.infer<typeof providerSchema>;
export type User = z.infer<typeof userSchema>;

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type LinkPasswordFormValues = z.infer<typeof linkPasswordFormSchema>;
