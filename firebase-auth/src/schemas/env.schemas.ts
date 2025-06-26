import z from 'zod';

export const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1, 'La clave API de Firebase es requerida'),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1, 'El dominio de autenticación de Firebase es requerido'),
  VITE_FIREBASE_DATABASE_URL: z.string().min(1, 'La URL de la base de datos de Firebase es requerida'),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1, 'El ID del proyecto de Firebase es requerido'),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1, 'El bucket de almacenamiento de Firebase es requerido'),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, 'El ID del remitente de mensajes de Firebase es requerido'),
  VITE_FIREBASE_APP_ID: z.string().min(1, 'El ID de la aplicación de Firebase es requerido'),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().min(1, 'El ID de medición de Firebase es requerido'),
  VITE_FIREBASE_VAPID_KEY: z.string().min(1, 'La clave VAPID de Firebase es requerida'),
});
