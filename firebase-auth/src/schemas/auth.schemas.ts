import z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string({
    message: 'Please enter a valid password',
  }),
});

export const registerFormSchema = z.object({
  displayName: z.string({
    message: 'Please enter a valid display name',
  }),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const linkPasswordFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
