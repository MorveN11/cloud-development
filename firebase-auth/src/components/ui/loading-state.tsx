import { Card, CardContent } from '@/components/ui/card';
import { CenteredContainer } from '@/components/ui/centered-container';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
  showCard?: boolean;
}

export function LoadingState({
  message = 'Loading...',
  size = 'md',
  fullScreen = false,
  className = '',
  showCard = true,
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  const content = (
    <div className="text-center">
      <div
        className={`mx-auto mb-4 animate-spin rounded-full border-primary border-t-transparent ${sizeClasses[size]}`}
      ></div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );

  if (!showCard) {
    return (
      <CenteredContainer fullScreen={fullScreen} className={className}>
        {content}
      </CenteredContainer>
    );
  }

  return (
    <CenteredContainer fullScreen={fullScreen} className={className}>
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center p-8">{content}</CardContent>
      </Card>
    </CenteredContainer>
  );
}
