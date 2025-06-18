import { z } from 'zod';

export const postSchema = z.object({
  id: z.string({
    message: 'Post ID is required',
  }),
  title: z
    .string({
      message: 'Title is required',
    })
    .min(1, {
      message: 'Title must not be empty',
    })
    .max(200, {
      message: 'Title must not exceed 200 characters',
    }),
  content: z
    .string({
      message: 'Content is required',
    })
    .min(1, {
      message: 'Content must not be empty',
    })
    .max(5000, {
      message: 'Content must not exceed 5000 characters',
    }),
  authorUID: z.string({
    message: 'Author UID is required',
  }),
  authorEmail: z.string().email({
    message: 'Author email must be a valid email address',
  }),
  createdAt: z.date({
    message: 'Created at must be a valid date',
  }),
});

export const createPostDataSchema = postSchema.omit({
  id: true,
  authorUID: true,
  authorEmail: true,
  createdAt: true,
});
