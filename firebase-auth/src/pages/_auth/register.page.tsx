import { RegisterForm } from '@/components/auth/register.form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from 'react-router';

export function RegisterPage() {
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
              <p className="text-muted-foreground">Únete a la comunidad boliviana</p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RegisterForm />
          </CardContent>

          <CardFooter className="mx-auto">
            <small className="text-center muted">
              ¿Ya tienes cuenta?
              <Button type="button" variant="link" className="px-2 py-0" asChild>
                <Link to="/login">Inicia sesión</Link>
              </Button>
            </small>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
