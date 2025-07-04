import { z } from 'zod';

export const postSchema = z.object({
  id: z.string({
    message: 'El ID de la publicación es requerido',
  }),
  title: z
    .string({
      message: 'El título es requerido',
    })
    .min(1, {
      message: 'El título no puede estar vacío',
    })
    .max(200, {
      message: 'El título no puede exceder 200 caracteres',
    }),
  content: z
    .string({
      message: 'El contenido es requerido',
    })
    .min(1, {
      message: 'El contenido no puede estar vacío',
    })
    .max(5000, {
      message: 'El contenido no puede exceder 5000 caracteres',
    }),
  imageName: z.string({
    message: 'El nombre de la imagen es requerido',
  }),
  imageUrl: z
    .string({
      message: 'La URL de la imagen es requerida',
    })
    .url({
      message: 'La URL de la imagen debe ser una URL válida',
    }),
  authorUID: z.string({
    message: 'El UID del autor es requerido',
  }),
  authorDisplayName: z.string({
    message: 'El nombre del autor es requerido',
  }),
  authorEmail: z.string().email({
    message: 'El correo del autor debe ser una dirección de correo válida',
  }),
  likesCount: z
    .number({
      message: 'El conteo de "me gusta" es requerido',
    })
    .int()
    .nonnegative({
      message: 'El conteo de "me gusta" no puede ser negativo',
    }),
  createdAt: z.date({
    message: 'La fecha de creación debe ser una fecha válida',
  }),
});
