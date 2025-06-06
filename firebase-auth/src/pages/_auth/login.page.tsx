import { GithubLogo } from '@/assets/logos/github-logo';
import { GoogleLogo } from '@/assets/logos/google-logo';
import { LoginForm } from '@/components/auth/login.form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuthActions } from '@/hooks/auth/use-auth-actions.hook';

export function LoginPage() {
  const { handleLoginWithProvider } = useAuthActions();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            <h1>Login</h1>
          </CardTitle>
          <CardDescription>
            <small>Enter your credentials or continue with a provider</small>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <LoginForm />

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <small className="bg-background px-2 text-muted-foreground">or continue with</small>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={() => handleLoginWithProvider('google.com')}
            >
              <GoogleLogo className="mr-2" />
              Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={() => handleLoginWithProvider('github.com')}
            >
              <GithubLogo className="mr-2" />
              Github
            </Button>
          </div>
        </CardContent>

        <CardFooter className="mx-auto">
          <small className="text-center muted">
            Don't have an account?
            <Button type="button" variant="link" className="px-2 py-0" asChild>
              <a href="/register">Register</a>
            </Button>
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}
