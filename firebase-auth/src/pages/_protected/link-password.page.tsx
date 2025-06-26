import { LinkPasswordForm } from '@/components/auth/link-password.form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from 'react-router';

export function LinkPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-accent/20">
      <Card className="w-full max-w-md">
        <CardHeader className="py-4 text-center">
          <CardTitle>
            <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent">
              Vincular Contraseña
            </h1>
          </CardTitle>
          <CardDescription>
            <p className="muted">Vincula tu cuenta con una contraseña para mayor seguridad</p>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <LinkPasswordForm />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-center text-sm text-muted-foreground">
            ¿Volver al Perfil?
            <Button type="button" variant="link" className="h-auto px-2 py-0 text-primary" asChild>
              <Link to="/user-profile">Perfil</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
