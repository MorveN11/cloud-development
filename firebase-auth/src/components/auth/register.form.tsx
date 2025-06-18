import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Password } from '@/components/ui/password';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';
import { registerFormSchema } from '@/schemas/auth.schemas';
import type { RegisterFormValues } from '@/types/auth.types';

import { zodResolver } from '@hookform/resolvers/zod';

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <small>Full Name</small>
              </FormLabel>
              <FormControl>
                <Input placeholder="Your Full Name" {...field} />
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
          loadingText="Creating account..."
        >
          Register
        </LoadingButton>
      </form>
    </Form>
  );
}
