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
import { updateUserProfileDtoSchema } from '@/schemas/user.schemas';
import type { UpdateUserProfileDto, UserProfile } from '@/types/user.types';

import { zodResolver } from '@hookform/resolvers/zod';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, MapPin, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface EditProfileFormProps {
  userProfile: UserProfile;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditProfileForm({ userProfile, onSuccess, onCancel }: EditProfileFormProps) {
  const { updateUser } = useUserActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UpdateUserProfileDto>({
    resolver: zodResolver(updateUserProfileDtoSchema),
    defaultValues: {
      address: userProfile.address,
      birthDate: userProfile.birthDate,
    },
  });

  const onSubmit = async (data: UpdateUserProfileDto) => {
    setIsSubmitting(true);

    const result = await updateUser(userProfile.uid, data);
    if (result) onSuccess?.();

    setIsSubmitting(false);
  };

  return (
    <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información de la Cuenta
          </CardTitle>
          <CardDescription>Información básica de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium">Correo Electrónico</label>
            <div className="mt-1 rounded-md border bg-transparent px-3 py-1 text-sm muted shadow-xs">
              {userProfile.email}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Nombre para Mostrar</label>
            <div className="mt-1 rounded-md border bg-transparent px-3 py-2 text-sm muted shadow-xs">
              {userProfile.displayName}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Proveedores Conectados</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {userProfile.providerData.map((provider, index) => (
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Información Personal
          </CardTitle>
          <CardDescription>Actualiza tu información personal</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            {field.value ? (
                              format(field.value, 'PPP', { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
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

              <div className="flex gap-4">
                <LoadingButton
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Cancelar
                </LoadingButton>
                <LoadingButton type="submit" className="flex-1" loading={isSubmitting} loadingText="Actualizando...">
                  Actualizar Perfil
                </LoadingButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
