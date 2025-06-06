import { Button } from '@/components/ui/button';

import { useNavigate } from 'react-router';

export function Error404Page() {
  const navigate = useNavigate();

  return (
    <main className="custom-container flex min-h-screen w-full flex-col items-center justify-center text-center">
      <div className="relative mx-auto mb-8 h-40 w-40">
        <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
        <div className="absolute inset-4 flex items-center justify-center">
          <div className="text-6xl">🔍</div>
        </div>
        <div className="absolute -right-2 -bottom-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 text-destructive">
          <span className="text-2xl">404</span>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="">¡Ups! The page you are looking for doesn't exist.</h1>

        <p className="text-muted-foreground">
          The page you are looking for might have been deleted, renamed, or is not available.
        </p>

        <div className="pt-4">
          <Button onClick={() => navigate('/')} className="px-8">
            Go back to home
          </Button>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-8">
        <p className="mb-4 text-sm text-muted-foreground">Are you looking for something in particular?</p>
        <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
          Dashboard
        </Button>
      </div>
    </main>
  );
}
