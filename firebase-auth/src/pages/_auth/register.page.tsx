import { RegisterForm } from '@/components/auth/register.form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            <h1>Register</h1>
          </CardTitle>
          <CardDescription>
            <small>Enter your credentials</small>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <RegisterForm />
        </CardContent>

        <CardFooter className="mx-auto">
          <small className="text-center muted">
            Already have an account?
            <Button type="button" variant="link" className="px-2 py-0" asChild>
              <a href="/login">Login</a>
            </Button>
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}
