import { GithubLogo } from '@/assets/logos/github-logo';
import { GoogleLogo } from '@/assets/logos/google-logo';
import { LoginForm } from '@/components/auth/login.form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';

import { Link } from 'react-router';

export function LoginPage() {
  const { handleLoginWithProvider } = useAuthActions();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="py-4 text-center">
            <CardTitle className="text-center">
              <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent">
                AltaConnect
              </h1>
            </CardTitle>
            <CardDescription>
              <p className="text-muted-foreground">Conectando Bolivia con el mundo</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <small className="bg-background px-4 text-muted-foreground">o continúa con</small>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                className="h-11 border-border/50 hover:bg-accent/50"
                onClick={() => handleLoginWithProvider('google.com')}
              >
                <GoogleLogo className="mr-2" />
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-11 border-border/50 hover:bg-accent/50"
                onClick={() => handleLoginWithProvider('github.com')}
              >
                <GithubLogo className="mr-2" />
                GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="mx-auto">
            <small className="text-center muted">
              ¿No tienes cuenta?
              <Button type="button" variant="link" className="px-2 py-0" asChild>
                <Link to="/register">Regístrate</Link>
              </Button>
            </small>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
