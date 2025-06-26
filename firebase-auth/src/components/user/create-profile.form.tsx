import { useState } from 'react';

import { ProviderIcon } from '@/components/auth/provider.icon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useUserActions } from '@/hooks/user/use-user-actions.hook';
import { cn } from '@/lib/utils';
import { createUserProfileDtoSchema } from '@/schemas/user.schemas';
import type { User } from '@/types/auth.types';
import type { CreateUserProfileDto } from '@/types/user.types';

import { zodResolver } from '@hookform/resolvers/zod';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, MapPin, User as UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface CreateProfileFormProps {
  user: User;
  onSuccess?: () => void;
}

export function CreateProfileForm({ user, onSuccess }: CreateProfileFormProps) {
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
      fcmTokens: [],
    },
  });

  const onSubmit = async (data: CreateUserProfileDto) => {
    setIsSubmitting(true);

    const result = await createUser(data);
    if (result) onSuccess?.();

    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-5xl gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Información de la Cuenta
            </CardTitle>
            <CardDescription>Información básica de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="uid"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre para mostrar</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="providerData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proveedores Conectados</FormLabel>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {field.value.map((provider, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm"
                      >
                        <ProviderIcon providerId={provider.providerId} size="sm" />
                        <span className="text-sm font-medium capitalize">
                          {provider.providerId === 'password'
                            ? 'Correo y Contraseña'
                            : provider.providerId.replace('.com', '')}
                        </span>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription>Completa tu perfil para mejorar la seguridad y personalización</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa tu dirección" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Nacimiento *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn(!field.value && 'muted')}>
                          {field.value ? format(field.value, 'PPP', { locale: es }) : <span>Selecciona una fecha</span>}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div>
              <LoadingButton type="submit" loading={isSubmitting} loadingText="Creando tu perfil..." className="w-full">
                Completar Registro
              </LoadingButton>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
