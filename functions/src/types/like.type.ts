import { z } from 'zod';
import { likeSchema } from '../schemas/like.schema';

export type Like = z.infer<typeof likeSchema>;
