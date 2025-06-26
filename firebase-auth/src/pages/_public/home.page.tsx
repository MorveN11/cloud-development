import { Button } from '@/components/ui/button';

import { Link } from 'react-router';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="custom-container flex min-h-screen flex-col items-center justify-center py-16">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            AltaConnect
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            La red social que conecta Bolivia. Comparte momentos, descubre nuestra rica cultura y conecta con tu
            comunidad.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/login">Inicia Sesión</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register">Crear Cuenta</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
