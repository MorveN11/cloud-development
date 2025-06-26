import { Button } from '@/components/ui/button';

import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Error404Page() {
  const navigate = useNavigate();

  return (
    <main className="custom-container flex min-h-screen w-full flex-col items-center justify-center text-center">
      <div className="relative mx-auto mb-8">
        <div className="flex items-center justify-center space-x-3">
          <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
            AltaConnect
          </h1>
        </div>

        <div className="mb-4 text-8xl font-bold text-primary/20">404</div>
      </div>

      <div className="max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-foreground">¡Ups! Página no encontrada</h2>

        <p className="text-muted-foreground">
          La página que buscas podría haber sido eliminada, renombrada o no está disponible.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 pt-6 sm:flex-row">
          <Button onClick={() => navigate('/')} className="px-6">
            <Home className="mr-2 h-4 w-4" />
            Ir al inicio
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)} className="px-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver atrás
          </Button>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <p className="mb-4 text-sm text-muted-foreground">¿Buscas algo específico?</p>
        <Button variant="outline" size="sm" onClick={() => navigate('/feed')}>
          Ir al Dashboard
        </Button>
      </div>
    </main>
  );
}
