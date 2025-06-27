import { z } from 'zod';
import { providerSchema } from '../schemas/provider.schema';

export type Provider = z.infer<typeof providerSchema>;
