import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Password } from '@/components/ui/password';
import { useAuth } from '@/contexts/auth.context';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';
import { linkPasswordFormSchema } from '@/schemas/auth.schemas';
import type { LinkPasswordFormValues } from '@/types/auth.types';

import { zodResolver } from '@hookform/resolvers/zod';

import { Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

export function LinkPasswordForm() {
  const { user } = useAuth();
  const { handleLinkWithPassword } = useAuthActions();

  const form = useForm<LinkPasswordFormValues>({
    resolver: zodResolver(linkPasswordFormSchema),
    defaultValues: {
      email: user.email,
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLinkWithPassword)} className="space-y-4">
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
                <Input
                  readOnly
                  disabled
                  placeholder="tu.correo@dominio.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
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
          loadingText="Vinculando..."
        >
          Vincular Cuenta
        </LoadingButton>
      </form>
    </Form>
  );
}
