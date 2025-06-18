import z from 'zod';

export const imageUploadResultSchema = z.object({
  name: z.string({
    required_error: 'El nombre de la imagen es obligatorio',
  }),
  url: z
    .string({
      required_error: 'La URL de la imagen es obligatoria',
    })
    .url({
      message: 'La URL de la imagen debe ser válida',
    }),
  fileSize: z
    .number({
      required_error: 'El tamaño del archivo es obligatorio',
    })
    .int({
      message: 'El tamaño del archivo debe ser un número entero',
    })
    .positive({
      message: 'El tamaño del archivo debe ser un número positivo',
    }),
  uploadedAt: z
    .date({
      required_error: 'La fecha de subida es obligatoria',
    })
    .refine((date) => date <= new Date(), {
      message: 'La fecha de subida no puede ser futura',
    }),
});
