import { LoadingState } from '@/components/ui/loading-state';

export function LoadingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-8 flex items-center">
        <h1 className="text-primary">AltaConnect</h1>
      </div>

      <LoadingState message="Conectando tu experiencia social..." size="lg" variant="gradient" />

      <p className="mt-6 text-sm text-muted-foreground">La red social que conecta Bolivia</p>
    </div>
  );
}
