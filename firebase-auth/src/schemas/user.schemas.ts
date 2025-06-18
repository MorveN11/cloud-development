import { userSchema } from '@/schemas/auth.schemas';

import { z } from 'zod';

export const userProfileSchema = userSchema.extend({
  address: z
    .string({
      message: 'Address is required',
    })
    .min(1, {
      message: 'Address must not be empty',
    }),
  birthDate: z.date({
    message: 'Birth date must be a valid date',
  }),
  createdAt: z.date({
    message: 'Created at must be a valid date',
  }),
  updatedAt: z.date({
    message: 'Updated at must be a valid date',
  }),
});

export const createUserProfileDtoSchema = userProfileSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const updateUserProfileDtoSchema = createUserProfileDtoSchema.partial();
