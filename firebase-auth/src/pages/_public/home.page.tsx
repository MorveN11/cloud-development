import { EmailLogo } from '@/assets/logos/email-logo';
import { FirebaseLogo } from '@/assets/logos/firebase-logo';
import { GithubLogo } from '@/assets/logos/github-logo';
import { FeatureCard } from '@/components/features/home/feature.card';
import { TechLogo } from '@/components/features/home/tech.logo';
import { Button } from '@/components/ui/button';

export function HomePage() {
  return (
    <div className="custom-container flex min-h-screen flex-col items-center justify-center gap-4">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Firebase Authentication</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Una solución completa de autenticación con soporte para múltiples proveedores y vinculación de cuentas.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          icon={<EmailLogo className="h-6 w-6" />}
          title="Email/Contraseña"
          description="Registro e inicio de sesión tradicional con correo electrónico y contraseña."
        />
        <FeatureCard
          icon={<GithubLogo className="h-6 w-6" />}
          title="Proveedores OAuth"
          description="Inicio de sesión con Google y GitHub con solo un clic."
        />
        <FeatureCard
          icon={<FirebaseLogo className="h-6 w-6" />}
          title="Seguro"
          description="Autenticación segura respaldada por Firebase."
        />
      </section>

      <section className="rounded-lg bg-muted/50 p-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold">Comenzar es fácil</h2>
          <p className="mt-2 text-muted-foreground">
            Configura tu proyecto en minutos y comienza a autenticar usuarios.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild>
              <a href="/login">Comenzar ahora</a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/MorveN11/cloud-development/tree/main/firebase-auth"
                target="_blank"
                rel="noopener noreferrer"
              >
                Repositorio
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Desarrollado con</h3>
        <div className="mt-4 flex flex-wrap justify-center gap-8">
          <TechLogo name="React" />
          <TechLogo name="TypeScript" />
          <TechLogo name="Firebase" />
          <TechLogo name="Tailwind CSS" />
          <TechLogo name="Shadcn UI" />
        </div>
      </section>
    </div>
  );
}
