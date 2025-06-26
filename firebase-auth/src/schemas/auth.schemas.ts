import { authProviders, type AuthProviderType } from '@/providers/auth.providers';

import z from 'zod';

export const providerSchema = z.object({
  providerId: z.enum(Object.keys(authProviders) as [AuthProviderType, ...AuthProviderType[]], {
    message: `El ID del proveedor debe ser uno de: ${Object.keys(authProviders).join(', ')}`,
  }),
});

export const userSchema = z.object({
  uid: z.string({
    message: 'El ID de usuario es requerido',
  }),
  email: z.string().email({
    message: 'El correo debe ser una dirección de correo válida',
  }),
  displayName: z.string({
    message: 'El nombre para mostrar es requerido',
  }),
  providerData: z.array(providerSchema, {
    message: 'Los datos del proveedor deben ser un array de objetos de proveedor',
  }),
});

export const loginFormSchema = z.object({
  email: z.string().email('Por favor ingresa un correo válido'),
  password: z.string({
    message: 'Por favor ingresa una contraseña válida',
  }),
});

export const registerFormSchema = z.object({
  displayName: z.string({
    message: 'Por favor ingresa un nombre válido para mostrar',
  }),
  email: z.string().email('Por favor ingresa un correo válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const linkPasswordFormSchema = z.object({
  email: z.string().email('Por favor ingresa un correo válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});
