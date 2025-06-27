import { z } from 'zod';

export const likeSchema = z.object({
  id: z.string({
    message: 'El ID del like es requerido',
  }),
  postId: z.string({
    message: 'El ID de la publicación es requerido',
  }),
  userId: z.string({
    message: 'El ID del usuario es requerido',
  }),
  createdAt: z.date({
    message: 'La fecha de creación es requerida',
  }),
});
