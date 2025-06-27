import type { createPostDataSchema, postSchema, postWithLikesSchema } from '@/schemas/post.schemas';

import type { z } from 'zod';

export type Post = z.infer<typeof postSchema>;

export type CreatePostData = z.infer<typeof createPostDataSchema>;

export type PostWithLikes = z.infer<typeof postWithLikesSchema>;
