import { useState, type ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

export function Password({ className, ...props }: ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false);
  const disabled = props.value === '' || props.value === undefined || props.disabled;

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('hide-password-toggle pr-10', className)}
        {...props}
      />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}</span>
      </Button>
    </div>
  );
}
