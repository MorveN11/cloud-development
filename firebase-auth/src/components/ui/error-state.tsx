import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CenteredContainer } from '@/components/ui/centered-container';

import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
  retryLabel?: string;
  backLabel?: string;
  fullScreen?: boolean;
}

export function ErrorState({
  title = 'Error',
  message,
  onRetry,
  onBack,
  retryLabel = 'Intentar de nuevo',
  backLabel = 'Volver',
  fullScreen = false,
}: ErrorStateProps) {
  return (
    <CenteredContainer fullScreen={fullScreen}>
      <Card className="w-full max-w-md border-destructive/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-destructive">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {onRetry && (
            <Button onClick={onRetry} className="w-full" variant="default">
              <RefreshCw className="mr-2 h-4 w-4" />
              {retryLabel}
            </Button>
          )}
          {onBack && (
            <Button onClick={onBack} variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Button>
          )}
        </CardContent>
      </Card>
    </CenteredContainer>
  );
}
