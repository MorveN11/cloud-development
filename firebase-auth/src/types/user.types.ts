import type { createUserProfileDtoSchema, updateUserProfileDtoSchema, userProfileSchema } from '@/schemas/user.schemas';

import type z from 'zod';

export type UserProfile = z.infer<typeof userProfileSchema>;
export type CreateUserProfileDto = z.infer<typeof createUserProfileDtoSchema>;
export type UpdateUserProfileDto = z.infer<typeof updateUserProfileDtoSchema>;
