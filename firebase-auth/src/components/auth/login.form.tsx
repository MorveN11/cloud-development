import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Password } from '@/components/ui/password';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';
import { loginFormSchema } from '@/schemas/auth.schemas';
import type { LoginFormValues } from '@/types/auth.types';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

export function LoginForm() {
  const { handleLogin } = useAuthActions();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <small>Email</small>
              </FormLabel>
              <FormControl>
                <Input placeholder="your.email@domain.com" type="email" autoComplete="email" {...field} />
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
              <FormLabel>
                <small>Password</small>
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
          loadingText="Signing in..."
        >
          Login
        </LoadingButton>
      </form>
    </Form>
  );
}
