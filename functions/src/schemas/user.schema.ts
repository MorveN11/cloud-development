import { z } from 'zod';
import { providerSchema } from './provider.schema';

export const userProfileSchema = z.object({
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
  address: z
    .string({
      message: 'La dirección es requerida',
    })
    .min(1, {
      message: 'La dirección no puede estar vacía',
    }),
  birthDate: z.date({
    message: 'La fecha de nacimiento debe ser una fecha válida',
  }),
  fcmTokens: z.array(z.string().min(1).max(200), {
    message: 'Los tokens FCM deben ser una lista de cadenas no vacías',
  }),
  createdAt: z.date({
    message: 'La fecha de creación debe ser una fecha válida',
  }),
  updatedAt: z.date({
    message: 'La fecha de actualización debe ser una fecha válida',
  }),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
