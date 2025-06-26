import { Card, CardContent } from '@/components/ui/card';

import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
  showCard?: boolean;
  variant?: 'default' | 'gradient' | 'minimal';
}

export function LoadingState({
  message = 'Cargando...',
  size = 'md',
  fullScreen = false,
  className = '',
  showCard = true,
  variant = 'default',
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const messageSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const LoadingSpinner = () => <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />;

  const content = (
    <div className="flex flex-col items-center space-y-4">
      {variant === 'gradient' && (
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-primary/20 via-blue-600/20 to-green-600/20 blur-xl" />
          <div className="relative bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            <LoadingSpinner />
          </div>
        </div>
      )}

      {variant === 'default' && <LoadingSpinner />}

      {variant === 'minimal' && (
        <div
          className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${sizeClasses[size]}`}
        />
      )}

      {message && (
        <div className="space-y-1 text-center">
          <p className={`font-medium text-foreground ${messageSizeClasses[size]}`}>{message}</p>
          {variant === 'gradient' && <p className="text-xs text-muted-foreground">Conectando Bolivia con el mundo</p>}
        </div>
      )}
    </div>
  );

  const containerClasses = fullScreen
    ? 'flex min-h-screen items-center justify-center'
    : 'flex items-center justify-center';

  if (!showCard) {
    return <div className={`${containerClasses} ${className}`}>{content}</div>;
  }

  if (fullScreen && variant === 'gradient') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
        <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center p-8">{content}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`${containerClasses} ${className}`}>
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center p-8">{content}</CardContent>
      </Card>
    </div>
  );
}
