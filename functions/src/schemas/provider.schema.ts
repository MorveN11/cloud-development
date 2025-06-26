import { z } from 'zod';
import { authProviders, AuthProviderType } from '../providers/auth.providers';

export const providerSchema = z.object({
  providerId: z.enum(Object.keys(authProviders) as [AuthProviderType, ...AuthProviderType[]], {
    message: `El ID del proveedor debe ser uno de: ${Object.keys(authProviders).join(', ')}`,
  }),
});

export type Provider = z.infer<typeof providerSchema>;
