import type { likeSchema } from '@/schemas/like.schemas';

import type z from 'zod';

export type Like = z.infer<typeof likeSchema>;
