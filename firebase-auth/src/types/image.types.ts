import type { imageUploadResultSchema } from '@/schemas/image.schemas';

import type z from 'zod';

export type ImageUploadResult = z.infer<typeof imageUploadResultSchema>;
