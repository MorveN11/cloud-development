import { z } from 'zod';
import { postSchema } from '../schemas/post.schema';

export type Post = z.infer<typeof postSchema>;
