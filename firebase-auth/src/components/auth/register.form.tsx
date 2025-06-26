import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Password } from '@/components/ui/password';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';
import { registerFormSchema } from '@/schemas/auth.schemas';
import type { RegisterFormValues } from '@/types/auth.types';

import { zodResolver } from '@hookform/resolvers/zod';

import { Lock, Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

export function RegisterForm() {
  const { handleRegister } = useAuthActions();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-8">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <small>Nombre Completo</small>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Tu Nombre Completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <small>Correo Electrónico</small>
                </FormLabel>
                <FormControl>
                  <Input placeholder="tu.correo@dominio.com" type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <small>Contraseña</small>
                </FormLabel>
                <FormControl>
                  <Password placeholder="••••••••" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            type="submit"
            className="w-full"
            loading={form.formState.isSubmitting}
            loadingText="Creando cuenta..."
          >
            Registrarse
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
