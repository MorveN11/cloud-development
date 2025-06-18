import { authProviders, type AuthProviderType } from '@/providers/auth.providers';

import z from 'zod';

export const providerSchema = z.object({
  providerId: z.enum(Object.keys(authProviders) as [AuthProviderType, ...AuthProviderType[]], {
    message: `Provider ID must be one of: ${Object.keys(authProviders).join(', ')}`,
  }),
});

export const userSchema = z.object({
  uid: z.string({
    message: 'User ID is required',
  }),
  email: z.string().email({
    message: 'Email must be a valid email address',
  }),
  displayName: z.string({
    message: 'Display name is required',
  }),
  providerData: z.array(providerSchema, {
    message: 'Provider data must be an array of provider objects',
  }),
});

export const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string({
    message: 'Please enter a valid password',
  }),
});

export const registerFormSchema = z.object({
  displayName: z.string({
    message: 'Please enter a valid display name',
  }),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const linkPasswordFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
