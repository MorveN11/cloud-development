import { useState } from 'react';

import { ProviderIcon } from '@/components/auth/provider-icon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/auth.context';
import { useUserActions } from '@/hooks/user/use-user-actions.hook';
import { cn } from '@/lib/utils';
import { createUserProfileDtoSchema } from '@/schemas/user.schemas';
import type { CreateUserProfileDto } from '@/types/user.types';

import { zodResolver } from '@hookform/resolvers/zod';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface CreateProfileFormProps {
  onSuccess?: () => void;
}

export function CreateProfileForm({ onSuccess }: CreateProfileFormProps) {
  const { user } = useAuth();
  const { createUser } = useUserActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateUserProfileDto>({
    resolver: zodResolver(createUserProfileDtoSchema),
    defaultValues: {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      providerData: user.providerData,
      address: '',
      birthDate: new Date(),
    },
  });

  const onSubmit = async (data: CreateUserProfileDto) => {
    setIsSubmitting(true);

    try {
      await createUser(data);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>Review your account information and complete your registration</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>

              <FormField
                control={form.control}
                name="uid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input {...field} disabled className="bg-gray-50" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled className="bg-gray-50" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled className="bg-gray-50" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="providerData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Connected Providers</FormLabel>
                    <div className="flex flex-wrap gap-3">
                      {field.value.map((provider, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm"
                        >
                          <ProviderIcon providerId={provider.providerId} size="sm" />
                          <span className="text-sm font-medium capitalize">
                            {provider.providerId === 'password' ? 'Email' : provider.providerId.replace('.com', '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Birth Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick your birth date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <LoadingButton
              type="submit"
              className="w-full"
              size="lg"
              loading={isSubmitting}
              loadingText="Creating Profile..."
            >
              Complete Registration
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
