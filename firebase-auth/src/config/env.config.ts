import { envSchema } from '@/schemas/env.schemas';

import { z } from 'zod';

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;

export type Environment = z.infer<typeof envSchema>;
