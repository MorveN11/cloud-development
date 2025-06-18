import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CenteredContainer } from '@/components/ui/centered-container';

import { AlertCircle, RefreshCw } from 'lucide-react';

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
  retryLabel = 'Try Again',
  backLabel = 'Go Back',
  fullScreen = false,
}: ErrorStateProps) {
  return (
    <CenteredContainer fullScreen={fullScreen}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-red-600">{title}</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {onRetry && (
            <Button onClick={onRetry} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              {retryLabel}
            </Button>
          )}
          {onBack && (
            <Button onClick={onBack} variant="outline" className="w-full">
              {backLabel}
            </Button>
          )}
        </CardContent>
      </Card>
    </CenteredContainer>
  );
}
