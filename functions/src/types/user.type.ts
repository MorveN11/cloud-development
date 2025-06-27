import { z } from 'zod';
import { userProfileSchema } from '../schemas/user.schema';

export type UserProfile = z.infer<typeof userProfileSchema>;
