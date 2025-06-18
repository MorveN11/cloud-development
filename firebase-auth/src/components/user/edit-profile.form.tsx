import { useState } from 'react';

import { ProviderIcon } from '@/components/auth/provider-icon';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/auth.context';
import { useUserActions } from '@/hooks/user/use-user-actions.hook';
import { cn } from '@/lib/utils';
import { updateUserProfileDtoSchema } from '@/schemas/user.schemas';
import type { UpdateUserProfileDto, UserProfile } from '@/types/user.types';

import { zodResolver } from '@hookform/resolvers/zod';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface EditProfileFormProps {
  userProfile: UserProfile;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditProfileForm({ userProfile, onSuccess, onCancel }: EditProfileFormProps) {
  const { user } = useAuth();
  const { updateUser } = useUserActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UpdateUserProfileDto>({
    resolver: zodResolver(updateUserProfileDtoSchema),
    defaultValues: {
      address: userProfile.address || '',
      birthDate: userProfile.birthDate ? new Date(userProfile.birthDate) : undefined,
    },
  });

  const onSubmit = async (data: UpdateUserProfileDto) => {
    if (!user?.uid) return;

    setIsSubmitting(true);
    try {
      const result = await updateUser(user.uid, data);
      if (result) {
        onSuccess?.();
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Review your account information and update your details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>

              <FormField
                control={form.control}
                name="uid"
                render={() => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input value={userProfile.uid} disabled className="bg-gray-50" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={() => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input value={userProfile.email} disabled className="bg-gray-50" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayName"
                render={() => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input value={userProfile.displayName || ''} disabled className="bg-gray-50" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="providerData"
                render={() => (
                  <FormItem>
                    <FormLabel>Connected Providers</FormLabel>
                    <div className="flex flex-wrap gap-3">
                      {userProfile.providerData.map((provider, index) => (
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
              <h3 className="text-lg font-semibold text-gray-900">Editable Information</h3>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} className="w-full" />
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
                          <button
                            type="button"
                            className={cn(
                              'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </button>
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

            <div className="flex gap-4 pt-4">
              <LoadingButton
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </LoadingButton>
              <LoadingButton type="submit" className="flex-1" loading={isSubmitting} loadingText="Updating...">
                Update Profile
              </LoadingButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
