import { userSchema } from '@/schemas/auth.schemas';

import { z } from 'zod';

export const userProfileSchema = userSchema.extend({
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

export const createUserProfileDtoSchema = userProfileSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const updateUserProfileDtoSchema = createUserProfileDtoSchema.partial();
